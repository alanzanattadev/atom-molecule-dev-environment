"use babel";
// @flow

import type { ConsoleLog } from "../Types/types";

export type SetConsoleLogsForTaskAction = {
  type: "BUFFER_CONSOLE_LOG",
  payload: {
    consoleLog: ConsoleLog,
  },
};

export function bufferConsoleLogsForTask(
  log: ConsoleLog,
): SetConsoleLogsForTaskAction {
  return {
    type: "BUFFER_CONSOLE_LOG",
    payload: {
      consoleLog: log,
    },
  };
}
