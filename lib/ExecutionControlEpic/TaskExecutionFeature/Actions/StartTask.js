"use babel";
// @flow

export type StartTaskAction = {
  type: "START_TASK",
  payload: {
    id: string,
  },
};

export function startTask(id: string): StartTaskAction {
  return {
    type: "START_TASK",
    payload: {
      id,
    },
  };
}
