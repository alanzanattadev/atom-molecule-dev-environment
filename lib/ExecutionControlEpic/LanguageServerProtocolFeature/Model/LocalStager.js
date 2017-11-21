"use babel";
// @flow

import path from "path";
import type { JsonRPCStreams } from "../Types/jsonrpc-stream";
import { fork } from "child_process";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";

export function runLocalStager(config: {
  plan: PlanConfig,
}): { streams: JsonRPCStreams } {
  const child = fork(path.join(__dirname, "..", "Process", "Controller"), [], {
    env: {
      plan: JSON.stringify(config.plan),
    },
  });

  return {
    streams: {
      inStream: child.stdout,
      outStream: child.stdin,
    },
  };
}
