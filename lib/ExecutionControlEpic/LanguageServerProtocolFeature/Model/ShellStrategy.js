"use babel";
// @flow

import Strategy from "./StrategyRunner";
import { spawn } from "child_process";
import type { ChildProcess } from "child_process";
import type { ShellStrategyType } from "../../TaskExecutionFeature/Types/types";

export default class ShellStrategy extends Strategy {
  child: ?ChildProcess;
  config: { strategy: ShellStrategyType };
  isLS: boolean;

  constructor(config: { strategy: ShellStrategyType }) {
    super();

    this.child = null;
    this.config = config;
    this.isLS = config.strategy.lsp || false;
  }

  run() {
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

    if (this.child == null) {
      throw new Error(
        `Cannot start process to run ${this.config.strategy.command}`,
      );
    }

    this.child.stdout.on("data", data => this.emit("data", { data }));
    this.child.stderr.on("data", data => this.emit("errorData", { data }));
    this.child.on("close", exitCode => this.emit("exit", { code: exitCode }));
    this.child.on("error", err => this.emit("error", { error: err }));
    this.setupLanguageClient({
      inStream: this.child.stdout,
      outStream: this.child.stdin,
    });
  }

  stop() {
    if (this.child) {
      this.child.kill();
    }
  }

  isStrategyLanguageServer() {
    return this.isLS;
  }
}
