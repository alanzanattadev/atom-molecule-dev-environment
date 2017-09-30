"use babel";
// @flow

import { spawn as spawnPty } from "node-pty";

export type Shell = string;

export type TerminalStrategy = {
  type: "terminal",
  command: string,
  shell?: Shell,
  cwd: string,
  env?: { [key: string]: string },
};

export type TerminalController = {
  onData(data: Buffer): void,
  onExit(exitCode: number): void,
  onError(err: any): void,
};

export function exec(
  config: TerminalStrategy,
  controller: TerminalController,
): child_process$ChildProcess {
  let child = spawnPty(
    config.shell.split(" ")[0],
    config.shell
      .split(" ")
      .slice(1)
      .concat(config.command),
    {
      name: "xterm-color",
      cols: 80,
      rows: 17,
      cwd: config.cwd,
      env: config.env,
    },
  );
  child.on("data", data => controller.onData(data));
  child.on("exit", exitCode => controller.onExit(exitCode));
  child.on("error", err => controller.onError(err));
  return child;
}
