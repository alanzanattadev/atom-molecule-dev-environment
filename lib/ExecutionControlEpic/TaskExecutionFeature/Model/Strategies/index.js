"use babel";
// @flow

import {exec as execShell} from "./ShellStrategy";
import {exec as execNode} from "./NodeProcessStrategy";
import type {Controller, Process, Strategy, StrategyRunner} from "../../Types/types.js.flow";

export function getStrategyRunnersAsMap(): { [key: string]: StrategyRunner } {
  return {
    shell: execShell,
    node: execNode,
  };
}

export function exec(strategy: Strategy, controller: Controller): ?Process {
  let runner = getStrategyRunnersAsMap()[strategy.type];

  if (runner) return runner(strategy, controller);
}
