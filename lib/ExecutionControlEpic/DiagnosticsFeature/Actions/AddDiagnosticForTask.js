'use babel'
// @flow

import type {Diagnostic} from "../Types/types.js.flow";


export type AddDiagnosticForTaskAction = {
  type: 'ADD_DIAGNOSTIC_FOR_TASK',
  payload: {
    diagnostic: Diagnostic
  };
};

export function addDiagnosticForTask(diagnostic: Diagnostic): AddDiagnosticForTaskAction {
  return {
    type: 'ADD_DIAGNOSTIC_FOR_TASK',
    payload: {
      diagnostic
    }
  };
};
