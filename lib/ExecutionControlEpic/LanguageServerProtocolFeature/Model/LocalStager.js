"use babel";
// @flow

import path from "path";
import { fork } from "child_process";
import Stager from "./Stager";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";

export function runLocalStager(config: { plan: PlanConfig }): Stager {
  const child = fork(path.join(__dirname, "..", "Process", "Controller"), [], {
    env: {
      plan: JSON.stringify(config.plan),
    },
  });

  return new Stager({
    streams: {
      inStream: child.stdout,
      outStream: child.stdin,
    },
  });
}
