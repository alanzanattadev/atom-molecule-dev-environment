"use babel";
// @flow

import type { Diagnostic } from "../Types/types.js.flow";

export type PublishDiagnosticsParamsForTask = {
  uri: string,
  task: string,
  diagnostics: Array<Diagnostic>,
};

export type SetDiagnosticsForTaskAction = {
  type: "SET_DIAGNOSTICS_FOR_TASK",
  payload: PublishDiagnosticsParamsForTask,
};

export function setDiagnosticsForTask(
  publishedDiagnostics: PublishDiagnosticsParamsForTask,
): SetDiagnosticsForTaskAction {
  return {
    type: "SET_DIAGNOSTICS_FOR_TASK",
    payload: publishedDiagnostics,
  };
}
