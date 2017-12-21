"use babel";
// @flow

import type { MoleculeDiagnostic } from "../Types/types.js.flow";

export type PublishDiagnosticsParamsForTask = {
  uri: string,
  task: string,
  diagnostics: Array<MoleculeDiagnostic>,
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
