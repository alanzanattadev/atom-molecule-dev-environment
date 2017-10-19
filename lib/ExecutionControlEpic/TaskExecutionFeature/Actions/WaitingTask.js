"use babel";
// @flow

export type WaitingTaskAction = {
  type: "WAITING_TASK",
  payload: {
    id: string,
  },
};

export function waitingTask(id: string): WaitingTaskAction {
  return {
    type: "WAITING_TASK",
    payload: {
      id,
    },
  };
}
