"use babel";
// @flow

import Strategy from "./StrategyRunner";
import { spawn } from "child_process";

export type Shell = string;

export type ShellStrategyType = {
  type: "shell",
  command: string,
  shell?: Shell,
  cwd: string,
  env?: { [key: string]: string },
};

export default class ShellStrategy extends Strategy {
  child: ?child_process$ChildProcess;
  config: { strategy: ShellStrategyType };

  constructor(config: { strategy: ShellStrategyType }) {
    super();

    this.child = null;
    this.config = config;
  }

  run(): ?Object {
    this.child = spawn(
      this.config.strategy.shell.split(" ")[0],
      this.config.strategy.shell
        .split(" ")
        .slice(1)
        .concat(this.config.strategy.command),
      {
        cwd: this.config.strategy.cwd,
        env: this.config.strategy.env,
      },
    );

    if (this.child != null) {
      this.child.stdout.on("data", data => this.emit("data", { data }));
      this.child.stderr.on("data", data => this.emit("data", { data }));
      this.child.on("close", exitCode => this.emit("exit", { code: exitCode }));
      this.child.on("error", err => this.emit("error", { error: err }));
    }
  }

  stop() {
    if (this.child) {
      this.child.kill();
    }
  }
}
