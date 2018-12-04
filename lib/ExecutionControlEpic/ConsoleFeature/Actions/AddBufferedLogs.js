"use babel";
// @flow

import type { ConsoleLog } from "../Types/types";

export type SetBufferedLogsForTaskAction = {
  type: "ADD_CONSOLE_LOGS",
  payload: {
    logs: Array<ConsoleLog>,
  },
};

export function addBufferedLogsForTask(
  logs: Array<ConsoleLog>,
): SetBufferedLogsForTaskAction {
  return {
    type: "ADD_CONSOLE_LOGS",
    payload: {
      logs,
    },
  };
}
