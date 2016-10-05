'use babel'
// @flow

export type StopTaskAction = {
  type: 'STOP_TASK',
  payload: {
    id: string
  };
};

export function stopTask(id: string): StopTaskAction {
  return {
    type: 'STOP_TASK',
    payload: {
      id
    }
  };
};
