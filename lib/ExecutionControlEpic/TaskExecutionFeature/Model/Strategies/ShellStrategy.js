"use babel";
// @flow

import { spawn } from "child_process";

export type ShellStrategy = {
  type: "shell",
  command: string,
  cwd: string,
};

export type ShellController = {
  onStdoutData(data: string): void,
  onStderrData(data: string): void,
  onExit(exitCode: number): void,
  onError(err: any): void,
};

export function exec(
  config: ShellStrategy,
  controller: ShellController,
): child_process$ChildProcess {
  let child = spawn(
    config.command.split(" ")[0],
    config.command.split(" ").slice(1),
    { cwd: config.cwd, shell: true },
  );
  child.stdout.on("data", data => controller.onStdoutData(data));
  child.stderr.on("data", data => controller.onStderrData(data));
  child.on("close", exitCode => controller.onExit(exitCode));
  child.on("error", err => controller.onError(err));
  return child;
}
