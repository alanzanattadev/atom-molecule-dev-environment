"use babel";
// @flow

export type RemoveDiagnosticsForTaskAction = {
  type: "REMOVE_DIAGNOSTICS_OF_TASK",
  payload: {
    task: string,
  },
};

export function removeDiagnosticsForTask(
  taskId: string,
): RemoveDiagnosticsForTaskAction {
  return {
    type: "REMOVE_DIAGNOSTICS_OF_TASK",
    payload: {
      task: taskId,
    },
  };
}
