"use babel";
// @flow

import type { Diagnostic } from "../Types/types.js.flow";

export type PublishDiagnosticsParamsForTask = {
  uri: string,
  task: string,
  diagnostics: Array<Diagnostic>,
};

export type AddDiagnosticsForTaskAction = {
  type: "ADD_DIAGNOSTICS_FOR_TASK",
  payload: PublishDiagnosticsParamsForTask,
};

export function addDiagnosticsForTask(
  publishedDiagnostics: PublishDiagnosticsParamsForTask,
): AddDiagnosticsForTaskAction {
  return {
    type: "ADD_DIAGNOSTICS_FOR_TASK",
    payload: publishedDiagnostics,
  };
}
