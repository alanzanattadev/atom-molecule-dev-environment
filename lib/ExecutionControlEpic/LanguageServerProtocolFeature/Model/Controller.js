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
      if (devtool != null) {
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

            /* const shellSelection =
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
                : Promise.resolve({ result: "bash -c" }); */
            const shellSelection =
              os.platform() === "win32"
                ? Promise.resolve({ result: "cmd.exe /c" })
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

              if (runner.isLanguageClient() && runner.connection != null) {
                runner.connection
                  .sendRequest("initialize", initializeOptions)
                  .then(
                    () => {
                      // console.log("Initialized with capabilities:", event);
                    },
                    () => {
                      // console.log("Couldn't initalize:", err);
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

                if (runner.isLanguageClient() && runner.connection != null) {
                  const runnerConnection = runner.connection;

                  connection.onNotification("initialized", data => {
                    runnerConnection.sendNotification("initialized", data);
                  });

                  connection.onRequest("shutdown", data => {
                    return runnerConnection.sendRequest("shutdown", data);
                  });

                  connection.onNotification("$/cancelRequest", data => {
                    runnerConnection.sendNotification("$/cancelRequest", data);
                  });

                  runnerConnection.onNotification("$/cancelRequest", data => {
                    connection.sendNotification("$/cancelRequest", data);
                  });

                  runnerConnection.onNotification(
                    "window/showMessage",
                    data => {
                      connection.sendNotification("window/showMessage", data);
                    },
                  );

                  runnerConnection.onRequest(
                    "window/showMessageRequest",
                    data => {
                      return connection.sendRequest(
                        "window/showMessageRequest",
                        data,
                      );
                    },
                  );

                  runnerConnection.onNotification("window/logMessage", data => {
                    connection.sendNotification("window/logMessage", data);
                  });

                  runnerConnection.onNotification("telemetry/event", data => {
                    connection.sendNotification("telemetry/event", data);
                  });

                  runnerConnection.onRequest(
                    "client/registerCapability",
                    data => {
                      return connection.sendRequest(
                        "client/registerCapability",
                        data,
                      );
                    },
                  );

                  runnerConnection.onRequest(
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
                      runnerConnection.sendNotification(
                        "workspace/didChangeConfiguration",
                        data,
                      );
                    },
                  );

                  connection.onNotification(
                    "workspace/didChangeWatchedFiles",
                    data => {
                      runnerConnection.sendNotification(
                        "workspace/didChangeWatchedFiles",
                        data,
                      );
                    },
                  );

                  connection.onRequest("workspace/symbol", data => {
                    return runnerConnection.sendRequest(
                      "workspace/symbol",
                      data,
                    );
                  });

                  connection.onRequest("workspace/executeCommand", data => {
                    return runnerConnection.sendRequest(
                      "workspace/executeCommand",
                      data,
                    );
                  });

                  runnerConnection.onRequest("workspace/applyEdit", data => {
                    return connection.sendRequest("workspace/applyEdit", data);
                  });

                  runnerConnection.onNotification(
                    "textDocument/publishDiagnostics",
                    data => {
                      connection.sendNotification(
                        "textDocument/publishDiagnostics",
                        data,
                      );
                    },
                  );

                  connection.onNotification("textDocument/didOpen", data => {
                    runnerConnection.sendNotification(
                      "textDocument/didOpen",
                      data,
                    );
                  });

                  connection.onNotification("textDocument/didChange", data => {
                    runnerConnection.sendNotification(
                      "textDocument/didChange",
                      data,
                    );
                  });

                  connection.onNotification("textDocument/willSave", data => {
                    runnerConnection.sendNotification(
                      "textDocument/willSave",
                      data,
                    );
                  });

                  connection.onRequest(
                    "textDocument/willSaveWaitUntil",
                    data => {
                      return runnerConnection.sendRequest(
                        "textDocument/willSaveWaitUntil",
                        data,
                      );
                    },
                  );

                  connection.onNotification("textDocument/didSave", data => {
                    runnerConnection.sendNotification(
                      "textDocument/didSave",
                      data,
                    );
                  });

                  connection.onNotification("textDocument/didClose", data => {
                    runnerConnection.sendNotification(
                      "textDocument/didClose",
                      data,
                    );
                  });

                  connection.onRequest("textDocument/completion", data => {
                    return runnerConnection.sendRequest(
                      "textDocument/completion",
                      data,
                    );
                  });

                  connection.onRequest("completionItem/resolve", data => {
                    return runnerConnection.sendRequest(
                      "completionItem/resolve",
                      data,
                    );
                  });

                  connection.onRequest("textDocument/hover", data => {
                    return runnerConnection.sendRequest(
                      "textDocument/hover",
                      data,
                    );
                  });

                  connection.onRequest("textDocument/signatureHelp", data => {
                    return runnerConnection.sendRequest(
                      "textDocument/signatureHelp",
                      data,
                    );
                  });

                  connection.onRequest("textDocument/references", data => {
                    return runnerConnection.sendRequest(
                      "textDocument/references",
                      data,
                    );
                  });

                  connection.onRequest(
                    "textDocument/documentHighlight",
                    data => {
                      return runnerConnection.sendRequest(
                        "textDocument/documentHighlight",
                        data,
                      );
                    },
                  );

                  connection.onRequest("textDocument/documentSymbol", data => {
                    return runnerConnection.sendRequest(
                      "textDocument/documentSymbol",
                      data,
                    );
                  });

                  connection.onRequest("textDocument/formatting", data => {
                    return runnerConnection.sendRequest(
                      "textDocument/formatting",
                      data,
                    );
                  });

                  connection.onRequest("textDocument/rangeFormatting", data => {
                    return runnerConnection.sendRequest(
                      "textDocument/rangeFormatting",
                      data,
                    );
                  });

                  connection.onRequest(
                    "textDocument/onTypeFormatting",
                    data => {
                      return runnerConnection.sendRequest(
                        "textDocument/onTypeFormatting",
                        data,
                      );
                    },
                  );

                  connection.onRequest("textDocument/definition", data => {
                    return runnerConnection.sendRequest(
                      "textDocument/definition",
                      data,
                    );
                  });

                  connection.onRequest("textDocument/codeAction", data => {
                    return runnerConnection.sendRequest(
                      "textDocument/codeAction",
                      data,
                    );
                  });

                  connection.onRequest("textDocument/codeLens", data => {
                    return runnerConnection.sendRequest(
                      "textDocument/codeLens",
                      data,
                    );
                  });

                  connection.onRequest("codeLens/resolve", data => {
                    return runnerConnection.sendRequest(
                      "codeLens/resolve",
                      data,
                    );
                  });

                  connection.onRequest("textDocument/documentLink", data => {
                    return runnerConnection.sendRequest(
                      "textDocument/documentLink",
                      data,
                    );
                  });

                  connection.onRequest("documentLink/resolve", data => {
                    return runnerConnection.sendRequest(
                      "documentLink/resolve",
                      data,
                    );
                  });

                  connection.onRequest("textDocument/rename", data => {
                    return runnerConnection.sendRequest(
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
