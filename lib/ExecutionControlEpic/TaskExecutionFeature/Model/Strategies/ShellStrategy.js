"use babel";
// @flow

import { spawn as spawnPty } from "node-pty";

export type ShellStrategy = {
  type: "shell",
  command: string,
  cwd: string,
  env?: { [key: string]: string },
};

export type ShellController = {
  onData(data: Buffer): void,
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
      env: config.env,
    },
  );
  child.on("data", data => controller.onData(data));
  child.on("close", exitCode => controller.onExit(exitCode));
  child.on("error", err => controller.onError(err));
  return child;
}
