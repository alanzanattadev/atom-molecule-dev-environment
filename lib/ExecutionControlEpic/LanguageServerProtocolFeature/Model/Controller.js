"use babel";
// @flow

import type { JsonRPCStreams } from "../Types/jsonrpc-stream";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types";
import LanguageClientConnection from "./LanguageClientConnection";
import { requireDevtool } from "../../DevtoolLoadingFeature/Model/DevtoolLoadingManager";
import EventEmitter from "events";
import { getStrategyRunner } from "./strategyRunnerHelpers";
import PluginApi from "./PluginApi";
import { createFilesWatcherObservable } from "../../../EventSystemEpic/FileFeature/Model/createFilesWatcherObservable";
import { watchman } from "fb-watchman";
import HelperApi from "../../TaskExecutionFeature/Model/HelperAPI";
import { fileEventsHelpers } from "../../../EventSystemEpic/FileFeature/Model/fileEventsHelpers";
import os from "os";

export class Controller extends EventEmitter {
  constructor() {
    super();
  }

  kill() {
    this.emit("kill");
  }
}

export function runController(config: {
  plan: PlanConfig,
  streams: JsonRPCStreams,
  actions: {
    kill: () => void,
  },
}): Controller {
  const connection = new LanguageClientConnection({
    ...config.streams,
  });

  let runner = null;
  let fileObservables = null;
  const controller = new Controller();
  connection.onRequest("initialize", initializeOptions => {
    return new Promise((resolve, reject) => {
      const devtool = requireDevtool(config.plan);
      if (devtool) {
        const execConfig = devtool.getStrategyForPlan(config.plan, HelperApi);
        if (execConfig.strategy == null) {
          console.error("cannot get strategy");
          connection.sendNotification("workspace/publishDiagnostics", {
            type: "STRATEGY_ERROR",
            payload: {
              error: "Task not launched : bad configuration",
            },
          });
          reject();
        }

        connection.onNotification("packages/didChange", ({ packages }) => {
          if (execConfig.controller.watchFiles) {
            const fileWatch = execConfig.controller.watchFiles(packages);
            if (
              fileWatch &&
              fileWatch.settings &&
              fileWatch.settings.paths &&
              fileWatch.settings.paths instanceof Array
            ) {
              fileObservables = fileWatch.settings.paths.map(path =>
                createFilesWatcherObservable(
                  watchman,
                  path,
                  fileWatch.settings.fileFilter,
                ).subscribe(x =>
                  fileWatch.onFilesChanged(x, fileEventsHelpers),
                ),
              );
            }
          }
        });

        connection
          .sendRequest("strategy/init", {
            strategy: execConfig.strategy,
          })
          .then(() => {
            if (execConfig.strategy.type === "terminal")
              connection.sendNotification("terminal/init", {});

            const taskAPI = PluginApi(
              connection.sendNotification.bind(connection),
            );

            const StrategyRunner = getStrategyRunner(execConfig.strategy);

            if (StrategyRunner == null) {
              reject();
              return;
            }

            const shellSelection =
              os.platform() === "win32"
                ? connection.sendRequest("window/showMessageRequest", {
                    message: "Choose a shell",
                    actions: [
                      {
                        title: "bash -c",
                      },
                      {
                        title: "cmd.exe /c",
                      },
                      {
                        title: "powershell.exe",
                      },
                    ],
                  })
                : Promise.resolve({ result: "bash -c" });
            shellSelection.then(answer => {
              const choosenShell = answer.result;

              runner = new StrategyRunner({
                strategy: {
                  ...execConfig.strategy,
                  shell: choosenShell,
                },
              });

              runner.on("data", ({ data }) => {
                if ("onData" in execConfig.controller) {
                  execConfig.controller.onData(data, taskAPI, HelperApi);
                }
                if (execConfig.strategy.type === "terminal")
                  connection.terminalOutput({
                    data,
                  });
              });

              runner.on("exit", exitCode => {
                if ("onExit" in execConfig.controller) {
                  execConfig.controller.onExit(exitCode, taskAPI, HelperApi);
                }
                config.actions.kill();
              });

              runner.on("error", err => {
                if ("onError" in execConfig.controller) {
                  if (
                    !(
                      err.code === "EIO" &&
                      err.errno === "EIO" &&
                      err.syscall === "read"
                    )
                  )
                    execConfig.controller.onError(err, taskAPI, HelperApi);
                }
                config.actions.kill();
              });

              runner.run();

              if (runner.isLanguageClient()) {
                runner.connection
                  .sendRequest("initialize", initializeOptions)
                  .then(
                    event => {
                      console.log("Initialized with capabilities:", event);
                    },
                    err => {
                      console.log("Couldn't initalize:", err);
                    },
                  );
              } else {
                resolve({ capabilities: {} });
              }

              if (runner != null) {
                controller.on("kill", () => {
                  runner && runner.stop();
                });

                if (execConfig.strategy.type === "terminal") {
                  connection.onNotification("terminal/input", ({ data }) => {
                    runner && runner.emit("terminal/input", { data });
                  });
                  connection.onNotification(
                    "terminal/resize",
                    ({ cols, rows }) => {
                      runner && runner.emit("terminal/resize", { cols, rows });
                    },
                  );
                }

                if (runner.isLanguageClient()) {
                  connection.onNotification("initialized", data => {
                    runner.connection.sendNotification("initialized", data);
                  });
                  connection.onRequest("shutdown", data => {
                    return runner.connection.sendRequest("shutdown", data);
                  });
                  connection.onNotification("$/cancelRequest", data => {
                    runner.connection.sendNotification("$/cancelRequest", data);
                  });
                  runner.connection.onNotification("$/cancelRequest", data => {
                    connection.sendNotification("$/cancelRequest", data);
                  });
                  runner.connection.onNotification(
                    "window/showMessage",
                    data => {
                      connection.sendNotification("window/showMessage", data);
                    },
                  );
                  runner.connection.onRequest(
                    "window/showMessageRequest",
                    data => {
                      return connection.sendRequest(
                        "window/showMessageRequest",
                        data,
                      );
                    },
                  );
                  runner.connection.onNotification(
                    "window/logMessage",
                    data => {
                      connection.sendNotification("window/logMessage", data);
                    },
                  );
                  runner.connection.onNotification("telemetry/event", data => {
                    connection.sendNotification("telemetry/event", data);
                  });
                  runner.connection.onRequest(
                    "client/registerCapability",
                    data => {
                      return connection.sendRequest(
                        "client/registerCapability",
                        data,
                      );
                    },
                  );
                  runner.connection.onRequest(
                    "client/unregisterCapability",
                    data => {
                      return connection.sendRequest(
                        "client/unregisterCapability",
                        data,
                      );
                    },
                  );
                  connection.onNotification(
                    "workspace/didChangeConfiguration",
                    data => {
                      runner.connection.sendNotification(
                        "workspace/didChangeConfiguration",
                        data,
                      );
                    },
                  );
                  connection.onNotification(
                    "workspace/didChangeWatchedFiles",
                    data => {
                      runner.connection.sendNotification(
                        "workspace/didChangeWatchedFiles",
                        data,
                      );
                    },
                  );
                  connection.onRequest("workspace/symbol", data => {
                    return runner.connection.sendRequest(
                      "workspace/symbol",
                      data,
                    );
                  });
                  connection.onRequest("workspace/executeCommand", data => {
                    return runner.connection.sendRequest(
                      "workspace/executeCommand",
                      data,
                    );
                  });
                  runner.connection.onRequest("workspace/applyEdit", data => {
                    return connection.sendRequest("workspace/applyEdit", data);
                  });
                  runner.connection.onNotification(
                    "textDocument/publishDiagnostics",
                    data => {
                      connection.sendNotification(
                        "textDocument/publishDiagnostics",
                        data,
                      );
                    },
                  );
                  connection.onNotification("textDocument/didOpen", data => {
                    runner.connection.sendNotification(
                      "textDocument/didOpen",
                      data,
                    );
                  });
                  connection.onNotification("textDocument/didChange", data => {
                    runner.connection.sendNotification(
                      "textDocument/didChange",
                      data,
                    );
                  });
                  connection.onNotification("textDocument/willSave", data => {
                    runner.connection.sendNotification(
                      "textDocument/willSave",
                      data,
                    );
                  });
                  connection.onRequest(
                    "textDocument/willSaveWaitUntil",
                    data => {
                      return runner.connection.sendRequest(
                        "textDocument/willSaveWaitUntil",
                        data,
                      );
                    },
                  );
                  connection.onNotification("textDocument/didSave", data => {
                    runner.connection.sendNotification(
                      "textDocument/didSave",
                      data,
                    );
                  });
                  connection.onNotification("textDocument/didClose", data => {
                    runner.connection.sendNotification(
                      "textDocument/didClose",
                      data,
                    );
                  });

                  connection.onRequest("textDocument/completion", data => {
                    return runner.connection.sendRequest(
                      "textDocument/completion",
                      data,
                    );
                  });
                  connection.onRequest("completionItem/resolve", data => {
                    return runner.connection.sendRequest(
                      "completionItem/resolve",
                      data,
                    );
                  });
                  connection.onRequest("textDocument/hover", data => {
                    return runner.connection.sendRequest(
                      "textDocument/hover",
                      data,
                    );
                  });
                  connection.onRequest("textDocument/signatureHelp", data => {
                    return runner.connection.sendRequest(
                      "textDocument/signatureHelp",
                      data,
                    );
                  });
                  connection.onRequest("textDocument/references", data => {
                    return runner.connection.sendRequest(
                      "textDocument/references",
                      data,
                    );
                  });
                  connection.onRequest(
                    "textDocument/documentHighlight",
                    data => {
                      return runner.connection.sendRequest(
                        "textDocument/documentHighlight",
                        data,
                      );
                    },
                  );
                  connection.onRequest("textDocument/documentSymbol", data => {
                    return runner.connection.sendRequest(
                      "textDocument/documentSymbol",
                      data,
                    );
                  });
                  connection.onRequest("textDocument/formatting", data => {
                    return runner.connection.sendRequest(
                      "textDocument/formatting",
                      data,
                    );
                  });
                  connection.onRequest("textDocument/rangeFormatting", data => {
                    return runner.connection.sendRequest(
                      "textDocument/rangeFormatting",
                      data,
                    );
                  });
                  connection.onRequest(
                    "textDocument/onTypeFormatting",
                    data => {
                      return runner.connection.sendRequest(
                        "textDocument/onTypeFormatting",
                        data,
                      );
                    },
                  );
                  connection.onRequest("textDocument/definition", data => {
                    return runner.connection.sendRequest(
                      "textDocument/definition",
                      data,
                    );
                  });
                  connection.onRequest("textDocument/codeAction", data => {
                    return runner.connection.sendRequest(
                      "textDocument/codeAction",
                      data,
                    );
                  });
                  connection.onRequest("textDocument/codeLens", data => {
                    return runner.connection.sendRequest(
                      "textDocument/codeLens",
                      data,
                    );
                  });
                  connection.onRequest("codeLens/resolve", data => {
                    return runner.connection.sendRequest(
                      "codeLens/resolve",
                      data,
                    );
                  });
                  connection.onRequest("textDocument/documentLink", data => {
                    return runner.connection.sendRequest(
                      "textDocument/documentLink",
                      data,
                    );
                  });
                  connection.onRequest("documentLink/resolve", data => {
                    return runner.connection.sendRequest(
                      "documentLink/resolve",
                      data,
                    );
                  });
                  connection.onRequest("textDocument/rename", data => {
                    return runner.connection.sendRequest(
                      "textDocument/rename",
                      data,
                    );
                  });
                }
              }
            });
          });
      } else {
        config.actions.kill();
        reject();
      }
    });
  });

  connection.onNotification("exit", () => {
    if (runner != null) {
      runner.stop();
    }
    if (fileObservables != null) {
      fileObservables.map(obs => obs.unsubscribe());
    }
    config.actions.kill();
  });

  connection.listen();

  return controller;
}

export default runController;
