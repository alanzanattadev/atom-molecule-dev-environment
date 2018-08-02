"use babel";
// @flow

export type CrashTaskAction = {
  type: "CRASH_TASK",
  payload: {
    id: string,
    name: string,
    date: number,
  },
};

export function crashTask(
  id: string,
  name: string,
  date: number,
): CrashTaskAction {
  return {
    type: "CRASH_TASK",
    payload: {
      id,
      name,
      date,
    },
  };
}
