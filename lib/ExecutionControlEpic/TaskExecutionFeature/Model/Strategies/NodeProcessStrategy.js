"use babel";
// @flow

import { fork } from "child_process";

export type NodeProcessStrategy = {
  type: "node",
  path: string,
  args: Array<string>,
  cwd: string,
};

export type NodeProcessController = {
  onData(data: any): void,
  onExit(exitCode: number): void,
  onError(err: any): void,
};

export function exec(
  config: NodeProcessStrategy,
  controller: NodeProcessController,
): child_process$ChildProcess {
  let child = fork(config.path, config.args, { cwd: config.cwd });
  child.on("message", data => controller.onData(data));
  child.on("close", exitCode => controller.onExit(exitCode));
  child.on("error", err => controller.onError(err));
  return child;
}
