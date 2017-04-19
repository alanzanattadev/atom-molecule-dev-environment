"use babel";
// @flow

import { spawn } from "child_process";
import { spawn as spawnPty } from "node-pty";

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
  let child = spawnPty(
    process.os === "win32" ? "cmd" : "bash",
    [process.os === "win32" ? "/c" : "-c"].concat(config.command),
    {
      name: "xterm-color",
      cols: 80,
      rows: 17,
      cwd: config.cwd,
    },
  );
  // child.stdout.on("data", data => controller.onStdoutData(data));
  // child.stderr.on("data", data => controller.onStderrData(data));
  child.on("data", data => controller.onStdoutData(data));
  child.on("close", exitCode => controller.onExit(exitCode));
  child.on("error", err => controller.onError(err));
  return child;
}
