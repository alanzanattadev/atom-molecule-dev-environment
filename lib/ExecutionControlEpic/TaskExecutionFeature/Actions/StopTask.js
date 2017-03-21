"use babel";
// @flow

export type StopTaskAction = {
  type: "STOP_TASK",
  payload: {
    id: string,
    date: number,
  },
};

export function stopTask(id: string, date: number): StopTaskAction {
  return {
    type: "STOP_TASK",
    payload: {
      id,
      date,
    },
  };
}
