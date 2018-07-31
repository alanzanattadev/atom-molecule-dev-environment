"use babel";
// @flow

import Strategy from "./StrategyRunner";
import { spawn as spawnPty } from "nuclide-prebuilt-libs/pty/lib/index";
import type { ITerminal } from "nuclide-prebuilt-libs/pty/lib/index.js.flow";
import type { TerminalStrategyType } from "../../TaskExecutionFeature/Types/types";

export default class TerminalStrategy extends Strategy {
  child: ?ITerminal;
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

    if (this.child == null) {
      throw new Error(
        `Cannot start process to run ${this.config.strategy.command}`,
      );
    }

    let child = this.child;
    child.on(
      "data",
      (data: any): void => {
        this.emit("data", { data });
      },
    );
    child.on(
      "exit",
      (exitCode: number): void => {
        this.emit("exit", { code: exitCode });
      },
    );
    child.on(
      "error",
      (err: any): void => {
        this.emit("error", { error: err });
      },
    );

    this.on("terminal/input", ({ data }) => {
      child.write(data);
    });

    this.on("terminal/resize", ({ cols, rows }) => {
      child.resize(cols, rows);
    });
  }

  stop() {
    if (this.child) {
      this.child.kill();
    }
  }
}
