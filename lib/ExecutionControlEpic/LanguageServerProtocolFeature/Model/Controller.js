"use babel";
// @flow

import { ResponseError, ErrorCodes } from "vscode-jsonrpc";
import { ConsoleLogError } from "../../LanguageServerProtocolFeature/Types/standard";
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

function _throwError(message) {
  throw new ResponseError(ErrorCodes.InvalidParams, message);
}

function _checkDevtool(devtool) {
  if (devtool.getStrategyForPlan == null) {
    _throwError("devtool has no getStrategyForPlan method");
  }
  if (typeof devtool.getStrategyForPlan !== "function") {
    _throwError("devtool.getStrategyForPlan must be a function");
  }
}

function _checkStrategy(execConfig) {
  if (execConfig.strategy == null) {
    _throwError("devtool.getStrategyForPlan(...) has no strategy fied");
  }
  if (typeof execConfig.strategy !== "object") {
    _throwError("devtool.getStrategyForPlan(...).strategy must be an object");
  }

  const controller = execConfig.controller;

  if (controller.onData && typeof controller.onData !== "function") {
    _throwError("controller.onData must be a function");
  }
  if (controller.onExit && typeof controller.onExit !== "function") {
    _throwError("controller.onExit must be a function");
  }
  if (controller.onError && typeof controller.onError !== "function") {
    _throwError("controller.onError must be a function");
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
  let execConfig = null;

  connection.onRequest("strategy/init", () => {
    const devtool = requireDevtool(config.plan);
    _checkDevtool(devtool);

    execConfig = devtool.getStrategyForPlan(config.plan, HelperApi);
    execConfig.controller = execConfig.controller || {};
    _checkStrategy(execConfig);

    return execConfig.strategy;
  });

  connection.onRequest("initialize", async initializeOptions => {
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
            ),
          );
          fileObservables.subscribe(x =>
            fileWatch.onFilesChanged(x, fileEventsHelpers),
          );
        }
      }
    });

    const StrategyRunner = getStrategyRunner(execConfig.strategy);

    if (StrategyRunner == null) {
      _throwError(
        "getStrategyForPlan(...).strategy.type is not a valid strategy type",
      );
    }

    const shellSelection = os.platform == "win32" ? "cmd.exe /c" : "bash -c";

    runner = new StrategyRunner({
      strategy: {
        ...execConfig.strategy,
        shell: shellSelection,
      },
    });

    const taskAPI = PluginApi(connection.sendNotification.bind(connection));

    runner.on("data", ({ data }) => {
      if (execConfig.controller.onData) {
        execConfig.controller.onData(data, taskAPI, HelperApi);
      }
      if (execConfig.strategy.type === "terminal")
        connection.terminalOutput({ data });
    });

    runner.on("errorData", ({ data }) => {
      connection.sendNotification("window/logMessage", {
        type: ConsoleLogError,
        message: `stderr: ${data}`,
      });
    });

    runner.on("exit", exitCode => {
      if (execConfig.controller.onExit) {
        execConfig.controller.onExit(exitCode, taskAPI, HelperApi);
      }
      config.actions.kill();
    });

    runner.on("error", err => {
      if (execConfig.controller.onError) {
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
      _throwError("Cannot load process for devtool");
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
      connection.onRequest("shutdown", () => null);
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
