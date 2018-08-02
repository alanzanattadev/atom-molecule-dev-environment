"use babel";
// @flow

import type { ConsoleLog } from "../Types/types";

export type SetConsoleLogsForTaskAction = {
  type: "ADD_CONSOLE_LOG",
  payload: {
    consoleLog: ConsoleLog,
  },
};

export function addConsoleLogsForTask(
  log: ConsoleLog,
): SetConsoleLogsForTaskAction {
  return {
    type: "ADD_CONSOLE_LOG",
    payload: {
      consoleLog: log,
    },
  };
}
