"use babel";
// @flow

import path from "path";
import { fork } from "child_process";
import Stager from "./Stager";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types";

export function runLocalStager(config: { plan: PlanConfig }): Stager {
  const child = fork(
    path.join(__dirname, "..", "Process", "Controller.js"),
    [],
    {
      stdio: ["pipe", "pipe", "pipe", "ipc"],
      env: {
        ...process.env,
        PLAN: JSON.stringify(config.plan),
      },
    },
  );

  child.on("error", err => console.error(err.toString()));

  const stager = new Stager({
    streams: {
      inStream: child.stdout,
      outStream: child.stdin,
    },
  });

  stager.on("kill", () => {
    child.kill();
  });

  return stager;
}
