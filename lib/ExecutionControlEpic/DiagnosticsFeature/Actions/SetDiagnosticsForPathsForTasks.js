"use babel";
// @flow

import type { MoleculeDiagnostic } from "../Types/types";

export type PathDef = {
  uri: string,
  diagnostics: Array<MoleculeDiagnostic>,
};

export type TaskDef = {
  taskId: string,
  paths: Array<PathDef>,
};

export type SetDiagnosticsForPathsForTasksAction = {
  type: "SET_DIAGNOSTICS_FOR_PATHS_FOR_TASKS",
  payload: {
    tasks: Array<TaskDef>,
  },
};

export function setDiagnosticsForPathsForTasks(
  taskDefs: Array<TaskDef>,
): SetDiagnosticsForPathsForTasksAction {
  return {
    type: "SET_DIAGNOSTICS_FOR_PATHS_FOR_TASKS",
    payload: {
      tasks: taskDefs,
    },
  };
}
