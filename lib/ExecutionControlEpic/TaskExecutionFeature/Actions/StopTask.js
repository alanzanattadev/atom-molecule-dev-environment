"use babel";
// @flow

export type StopTaskAction = {
  type: "STOP_TASK",
  payload: {
    id: string,
    name: string,
    date: number,
  },
};

export function stopTask(
  id: string,
  name: string,
  date: number,
): StopTaskAction {
  return {
    type: "STOP_TASK",
    payload: {
      id,
      name,
      date,
    },
  };
}
