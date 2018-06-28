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

  connection.onRequest("initialize", async initializeOptions => {
    const devtool = requireDevtool(config.plan);
    if (devtool == null) {
      config.actions.kill();
      throw new Error(`Cannot find devtool for plan '${config.plan.name}'`);
    }

    const execConfig = devtool.getStrategyForPlan(config.plan, HelperApi);
    if (execConfig.strategy == null) {
      // TODO - remove sendNotification and handle error in Molecule console
      // instead
      connection.sendNotification("workspace/publishDiagnostics", {
        type: "STRATEGY_ERROR",
        payload: {
          error: "Task not launched : bad configuration",
        },
      });
      throw new Error(
        `Cannot load devtool '${
          devtool.name
        }': getStrategyForPlan(...).strategy must be an object`,
      );
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
            ).subscribe(x => fileWatch.onFilesChanged(x, fileEventsHelpers)),
          );
        }
      }
    });

    await connection.sendRequest("strategy/init", {
      strategy: execConfig.strategy,
    });

    if (execConfig.strategy.type === "terminal")
      connection.sendNotification("terminal/init", {});

    const taskAPI = PluginApi(connection.sendNotification.bind(connection));

    const StrategyRunner = getStrategyRunner(execConfig.strategy);

    if (StrategyRunner == null) {
      throw new Error(
        `Cannot load devtool '${
          devtool.name
        }': getStrategyForPlan(...).strategy.type is not a valid strategy type`,
      );
    }

    const shellSelection = os.platform() === "win32" ? "cmd.exe /c" : "bash -c";
    const choosenShell = shellSelection;

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
          !(err.code === "EIO" && err.errno === "EIO" && err.syscall === "read")
        )
          execConfig.controller.onError(err, taskAPI, HelperApi);
      }
      config.actions.kill();
    });

    runner.run();

    if (runner.isStrategyLanguageServer() && runner.connection == null) {
      runner.stop();
      throw new Error(`Cannot load process for devtool '${devtool.name}'`);
    }

    controller.on("kill", () => {
      runner.stop();
    });

    if (execConfig.strategy.type === "terminal") {
      connection.onNotification("terminal/input", ({ data }) => {
        runner.emit("terminal/input", { data });
      });
      connection.onNotification("terminal/resize", ({ cols, rows }) => {
        runner.emit("terminal/resize", { cols, rows });
      });
    }

    if (!runner.isLanguageClient()) {
      connection.onRequest("shutdown", () =>
        Promise.resolve({
          result: null,
        }),
      );
    }

    if (runner.isLanguageClient()) {
      const notificationsToLS = [
        "initialized",
        "$/cancelRequest",
        "workspace/didChangeConfiguration",
        "workspace/didChangeWatchedFiles",
        "textDocument/didOpen",
        "textDocument/didChange",
        "textDocument/willSave",
        "textDocument/didSave",
        "textDocument/didClose",
      ];

      const requestsToLS = [
        "shutdown",
        "workspace/symbol",
        "workspace/executeCommand",
        "textDocument/willSaveWaitUntil",
        "textDocument/completion",
        "completionItem/resolve",
        "textDocument/hover",
        "textDocument/signatureHelp",
        "textDocument/references",
        "textDocument/documentHighlight",
        "textDocument/documentSymbol",
        "textDocument/formatting",
        "textDocument/rangeFormatting",
        "textDocument/onTypeFormatting",
        "textDocument/definition",
        "textDocument/codeAction",
        "textDocument/codeLens",
        "codeLens/resolve",
        "textDocument/documentLink",
        "documentLink/resolve",
        "textDocument/rename",
      ];

      const notificationsFromLS = [
        "$/cancelRequest",
        "window/showMessage",
        "window/logMessage",
        "telemetry/event",
        "textDocument/publishDiagnostics",
      ];

      const requestsFromLS = [
        "window/showMessageRequest",
        "client/registerCapability",
        "client/unregisterCapability",
        "workspace/applyEdit",
      ];

      for (const notificationTitle of notificationsToLS) {
        connection.onNotification(notificationTitle, data => {
          return runner.connection.sendNotification(notificationTitle, data);
        });
      }

      for (const requestTitle of requestsToLS) {
        connection.onRequest(requestTitle, data => {
          return runner.connection.sendRequest(requestTitle, data);
        });
      }

      for (const notificationTitle of notificationsFromLS) {
        runner.connection.onNotification(notificationTitle, data => {
          connection.sendNotification(notificationTitle, data);
        });
      }

      for (const requestTitle of requestsFromLS) {
        runner.connection.onRequest(requestTitle, data => {
          return connection.sendRequest(requestTitle, data);
        });
      }
    }

    if (runner.isLanguageClient()) {
      return runner.connection.sendRequest("initialize", initializeOptions);
    } else {
      return { capabilities: {} };
    }
  });

  connection.onNotification("exit", () => {
    if (runner != null && runner.isLanguageClient() === false) {
      runner.stop();
    }
    if (fileObservables != null) {
      for (const obs of fileObservables) {
        obs.unsubscribe();
      }
    }
    config.actions.kill();
  });

  connection.listen();

  return controller;
}

export default runController;
