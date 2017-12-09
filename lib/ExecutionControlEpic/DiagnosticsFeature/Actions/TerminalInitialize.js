"use babel";
// @flow

import type { Task } from "../../TaskExecutionFeature/Types/types";

export type TerminalInitializedAction = {
  type: "TERMINAL_INITIALIZED",
  payload: {
    taskId: string,
  },
};

export function terminalInitialized(taskId: string): TerminalInitializedAction {
  return {
    type: "TERMINAL_INITIALIZED",
    payload: {
      taskId: taskId,
    },
  };
}
