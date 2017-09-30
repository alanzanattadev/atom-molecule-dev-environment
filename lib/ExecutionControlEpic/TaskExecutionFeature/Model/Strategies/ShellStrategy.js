"use babel";
// @flow

import { spawn } from "child_process";

export type Shell = string;

export type ShellStrategy = {
  type: "shell",
  command: string,
  shell?: Shell,
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
  let child = spawn(
    config.shell.split(" ")[0],
    config.shell
      .split(" ")
      .slice(1)
      .concat(config.command),
    {
      cwd: config.cwd,
      env: config.env,
    },
  );
  child.stdout.on("data", data => controller.onData(data));
  child.stderr.on("data", data => controller.onData(data));
  child.on("close", exitCode => controller.onExit(exitCode));
  child.on("error", err => controller.onError(err));
  return child;
}
