"use babel";
// @flow

export type SucceedTaskAction = {
  type: "SUCCEED_TASK",
  payload: {
    id: string,
    date: number
  }
};

export function succeedTask(id: string, date: number): SucceedTaskAction {
  return {
    type: "SUCCEED_TASK",
    payload: {
      id,
      date
    }
  };
}
