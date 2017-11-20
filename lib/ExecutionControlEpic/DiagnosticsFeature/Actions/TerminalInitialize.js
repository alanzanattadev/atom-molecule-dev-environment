"use babel";
// @flow

import type { Task } from "../../TaskExecutionFeature/Types/types";

export type TerminalInitializedAction = {
  type: "TERMINAL_INITIALIZED",
  payload: {
    task: Task,
  },
};

export function terminalInitialized(task: Task): TerminalInitializedAction {
  return {
    type: "TERMINAL_INITIALIZED",
    payload: {
      task: { ...task, terminal: true },
    },
  };
}
