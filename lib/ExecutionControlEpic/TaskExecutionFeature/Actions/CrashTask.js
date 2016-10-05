'use babel'
// @flow

export type CrashTaskAction = {
  type: 'CRASH_TASK',
  payload: {
    id: string
  };
};

export function crashTask(id: string): CrashTaskAction {
  return {
    type: 'CRASH_TASK',
    payload: {
      id
    }
  };
};
