"use babel";
// @flow

import Strategy from "./StrategyRunner";
import { fork } from "child_process";
import type { ChildProcess } from "child_process";
import type { NodeProcessStrategyType } from "../../TaskExecutionFeature/Types/types";

export default class NodeProcessStrategy extends Strategy {
  child: ?ChildProcess;
  config: { strategy: NodeProcessStrategyType };
  isLS: boolean;

  constructor(config: { strategy: NodeProcessStrategyType }) {
    super();

    this.child = null;
    this.config = config;
    this.isLS = config.strategy.lsp || false;
  }

  run() {
    this.child = fork(
      this.config.strategy.path,
      this.config.strategy.args || [],
      {
        cwd: this.config.strategy.cwd,
        stdio: ["pipe", "pipe", "pipe", "ipc"],
        env: { ...process.env, ...this.config.strategy.env },
      },
    );

    if (this.child != null) {
      let child = this.child;
      child.on("message", data => this.emit("data", { data }));
      child.on("close", exitCode => this.emit("exit", { code: exitCode }));
      child.on("error", err => this.emit("error", { error: err }));
      this.setupLanguageClient({
        inStream: child.stdout,
        outStream: child.stdin,
      });
    }
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
