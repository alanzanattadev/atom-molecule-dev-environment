"use babel";
// @flow

export type BusyTaskAction = {
  type: "BUSY_TASK",
  payload: {
    id: string,
  },
};

export function busyTask(id: string): BusyTaskAction {
  return {
    type: "BUSY_TASK",
    payload: {
      id,
    },
  };
}
