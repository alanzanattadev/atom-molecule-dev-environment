"use babel";
// @flow

import type { JsonRPCStreams } from "../Types/jsonrpc-stream";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import LanguageClientConnection from "./LanguageClientConnection";
import { requireDevtool } from "../../DevtoolLoadingFeature/Model/DevtoolLoadingManager";
import { exec } from "../../TaskExecutionFeature/Model/Strategies";

export function runController(config: {
  plan: PlanConfig,
  streams: JsonRPCStreams,
  actions: {
    kill: () => void,
  },
}) {
  console.log("Running controller");
  const connection = new LanguageClientConnection({
    ...config.streams,
  });

  let childProcess = null;

  connection.onRequest("initialize", () => {
    console.log("on initialize");
    return new Promise((resolve, reject) => {
      console.log("running promise");
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

        if (execConfig.strategy.type === "terminal")
          connection.sendNotification("terminal/init", {});

        childProcess = exec(execConfig.strategy, execConfig.controller);
      } else {
        config.actions.kill();
      }
    });
  });

  connection.onNotification("exit", () => {
    if (childProcess != null) {
      childProcess.kill();
    }
    config.actions.kill();
  });

  connection.listen();

  return {};
}

export default runController;
