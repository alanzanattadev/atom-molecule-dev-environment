'use babel'
// @flow

import type {Diagnostic} from "../Types/types.js.flow";


export type AddDiagnosticsForTaskAction = {
  type: 'ADD_DIAGNOSTICS_FOR_TASK',
  payload: {
    diagnostics: Array<Diagnostic>
  };
};

export function addDiagnosticsForTask(diagnostics: Array<Diagnostic>): AddDiagnosticsForTaskAction {
  return {
    type: 'ADD_DIAGNOSTICS_FOR_TASK',
    payload: {
      diagnostics
    }
  };
};
