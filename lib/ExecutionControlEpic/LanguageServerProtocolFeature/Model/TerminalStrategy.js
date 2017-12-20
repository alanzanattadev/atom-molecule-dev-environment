"use babel";
// @flow

import Strategy from "./StrategyRunner";
import { spawn as spawnPty } from "nuclide-prebuilt-libs/pty";

export type Shell = string;

export type TerminalStrategyType = {
  type: "terminal",
  command: string,
  shell?: Shell,
  cwd: string,
  env?: { [key: string]: string },
};
export default class TerminalStrategy extends Strategy {
  child: ?child_process$ChildProcess;
  config: { strategy: TerminalStrategyType };

  constructor(config: { strategy: TerminalStrategyType }) {
    super();

    this.child = null;
    this.config = config;
  }

  run() {
    this.child = spawnPty(
      this.config.strategy.shell.split(" ")[0],
      this.config.strategy.shell
        .split(" ")
        .slice(1)
        .concat(this.config.strategy.command),
      {
        name: "xterm-color",
        cols: 80,
        rows: 17,
        cwd: this.config.strategy.cwd,
        env: this.config.strategy.env,
      },
    );

    if (this.child != null) {
      this.child.on("data", data => this.emit("data", { data }));
      this.child.on("exit", exitCode => this.emit("exit", { code: exitCode }));
      this.child.on("error", err => this.emit("error", { error: err }));

      this.on("terminal/input", ({ data }) => {
        this.child.write(data);
      });

      this.on("terminal/resize", ({ cols, rows }) => {
        this.child.resize(cols, rows);
      });
    }
  }

  stop() {
    if (this.child) {
      this.child.kill();
    }
  }
}
