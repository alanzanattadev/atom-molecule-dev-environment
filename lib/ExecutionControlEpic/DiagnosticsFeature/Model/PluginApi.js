'use babel'
// @flow
import type {Diagnostic} from "../Types/types.js";
import { fromJS } from "immutable";
import {addDiagnosticForTask} from "../Actions/AddDiagnosticForTask";
import type {TaskAPI} from "../../DevtoolLoadingFeature/Types/types.js";

export function provideDiagnostics(taskID: string, store: {dispatch: (action: any) => void}): (diagnostics: Array<Diagnostic>) => void {
  return function(diagnostics: Array<Diagnostic>): void {
    diagnostics.forEach(diagnostic => store.dispatch(addDiagnosticForTask(fromJS(diagnostic).set('task', taskID).toJS())));
  };
};

export default function(taskID: string, store: {dispatch: (action: any) => void}): TaskAPI {
  return {
    addDiagnostics: provideDiagnostics(taskID, store),
  };
};
