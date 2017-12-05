"use babel";
// @flow

import Strategy from "./StrategyRunner";
import { fork } from "child_process";

export type NodeProcessStrategyType = {
  type: "node",
  path: string,
  args: Array<string>,
  cwd: string,
};

export default class NodeProcessStrategy extends Strategy {
  child: ?child_process$ChildProcess;
  config: { strategy: NodeProcessStrategyType };

  constructor(config: { strategy: NodeProcessStrategyType }) {
    super();

    this.child = null;
    this.config = config;
  }

  run() {
    this.child = fork(this.config.strategy.path, this.config.strategy.args, {
      cwd: this.config.strategy.cwd,
    });

    if (this.child != null) {
      this.child.on("message", data => this.emit("data", { data }));
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
