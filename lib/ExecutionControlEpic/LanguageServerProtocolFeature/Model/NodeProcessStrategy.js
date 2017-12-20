"use babel";
// @flow

import Strategy from "./StrategyRunner";
import { fork } from "child_process";

export type NodeProcessStrategyType = {
  type: "node",
  path: string,
  args: Array<string>,
  env?: { [key: string]: string },
  cwd: string,
  lsp?: boolean,
};

export default class NodeProcessStrategy extends Strategy {
  child: ?child_process$ChildProcess;
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
      this.child.on("message", data => this.emit("data", { data }));
      this.child.on("close", exitCode => this.emit("exit", { code: exitCode }));
      this.child.on("error", err => this.emit("error", { error: err }));
      this.setupLanguageClient({
        inStream: this.child.stdout,
        outStream: this.child.stdin,
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
