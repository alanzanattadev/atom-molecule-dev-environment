'use babel'
// @flow

export type NextStepAction = {
  type: 'NEXT_STEP',
  payload: {
    id: string,
  },
};

export function nextStep(taskId: string): NextStepAction {
  return {
    type: 'NEXT_STEP',
    payload: {
      id: taskId,
    }
  };
};
