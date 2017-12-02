"use babel";
// @flow

import type { JsonRPCStreams } from "../Types/jsonrpc-stream";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import LanguageClientConnection from "./LanguageClientConnection";
import { requireDevtool } from "../../DevtoolLoadingFeature/Model/DevtoolLoadingManager";
import EventEmitter from "events";
import { getStrategyRunner } from "./strategyRunnerHelpers";

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
  console.log("Running controller");
  const connection = new LanguageClientConnection({
    ...config.streams,
  });

  let runner = null;
  const controller = new Controller();

  connection.onRequest("initialize", () => {
    return new Promise((resolve, reject) => {
      const devtool = requireDevtool(config.plan);
      if (devtool) {
        const execConfig = devtool.getStrategyForPlan(config.plan);
        if (execConfig.strategy == null || execConfig.controller == null) {
          connection.sendNotification("workspace/publishDiagnostics", {
            type: "STRATEGY_ERROR",
            payload: {
              error: "Task not launched : bad configuration",
            },
          });
        } else {
          config.actions.kill();
        }

        connection.sendNotification("strategy/init", {
          strategy: execConfig.strategy,
        });

        if (execConfig.strategy.type === "terminal")
          connection.sendNotification("terminal/init", {});

        const taskAPI = {};
        const helperAPI = {};

        const StrategyRunner = getStrategyRunner(execConfig.strategy);

        if (StrategyRunner == null) {
          reject();
          return;
        }

        runner = new StrategyRunner({
          strategy: {
            ...execConfig.strategy,
            shell: "bash -c",
          },
        });

        runner.on("data", ({ data }) => {
          // if (handlers.onData) {
          //   handlers.onData(data);
          // }
          // if ("onData" in execConfig.controller) {
          //   execConfig.controller.onData(
          //     data,
          //     taskAPI,
          //     helperAPI,
          //     () => childProcess,
          //   );
          // }
          connection.terminalOutput({
            data,
          });
          // broker.emit("data", { task, data });
        });

        runner.on("exit", () => {
          // if (handlers.onExit) {
          //   handlers.onExit(exitCode);
          // }
          // if ("onExit" in controller) {
          //   execConfig.controller.onExit(exitCode, taskAPI, helperAPI);
          // }
          // observer.next(crashTask(taskID.toString(), getCurrentDate()));
          // observer.complete();
        });

        runner.on("error", () => {
          // if ("onError" in execConfig.controller) {
          //   if (
          //     !(
          //       err.code === "EIO" &&
          //       err.errno === "EIO" &&
          //       err.syscall === "read"
          //     )
          //   )
          //     execConfig.controller.onError(err, taskAPI, helperAPI);
          // }
          // observer.next(crashTask(taskID.toString(), getCurrentDate()));
          // observer.complete();
        });

        runner.run();

        if (runner != null) {
          controller.on("kill", () => {
            runner.stop();
          });
        }
        resolve({ capabilities: {} });
        if (execConfig.strategy.type === "terminal") {
          connection.onNotification("terminal/input", ({ data }) => {
            runner.emit("terminal/input", { data });
          });
          connection.onNotification("terminal/resize", ({ cols, rows }) => {
            runner.emit("terminal/resize", { cols, rows });
          });
        }
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
    config.actions.kill();
  });

  connection.listen();

  return controller;
}

export default runController;
