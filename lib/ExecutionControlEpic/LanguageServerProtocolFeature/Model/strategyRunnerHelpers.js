"use babel";
// @flow

import type { Strategy as StrategyType } from "../../TaskExecutionFeature/Types/types.js.flow";

import NodeProcessStrategy from "./NodeProcessStrategy";
import TerminalStrategy from "./TerminalStrategy";
import ShellStrategy from "./ShellStrategy";
import StrategyRunner from "./StrategyRunner";

export function getStrategyRunner(
  config: StrategyType,
): ?Class<StrategyRunner> {
  switch (config.type) {
    case "terminal":
      return TerminalStrategy;
    case "shell":
      return ShellStrategy;
    case "node":
      return NodeProcessStrategy;
    default:
      return null;
  }
}
