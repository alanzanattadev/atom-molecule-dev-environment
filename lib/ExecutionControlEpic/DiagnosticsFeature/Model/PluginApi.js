'use babel'
// @flow
import type {Diagnostic} from "../Types/types.js.flow";
import { fromJS } from "immutable";
import {addDiagnosticForTask} from "../Actions/AddDiagnosticForTask";
import type {TaskAPI} from "../../DevtoolLoadingFeature/Types/types.js.flow";
import type {State} from '../../../GlobalSystem/types.js.flow';
import {nextStep} from '../../TaskExecutionFeature/Actions/NextStep';
import {selectTaskOfID} from '../../TaskExecutionFeature/Selectors/Tasks';
import {selectTasksReducer} from '../../../GlobalSystem/Selectors';

export function provideDiagnostics(taskID: string, store: {dispatch: (action: any) => void, getState: () => any}): (diagnostics: Array<Diagnostic>) => void {
  return function(diagnostics: Array<Diagnostic>): void {
    let task = selectTaskOfID(selectTasksReducer(store.getState()), taskID);
    diagnostics.forEach(diagnostic => store.dispatch(
      addDiagnosticForTask(fromJS(diagnostic).set('task', taskID).set('step', task.step).toJS())
    ));
  };
};

export function provideNextStep(taskID: string, store: {dispatch: (action: any) => void, getState: () => any}): () => void {
  return function(): void {
    store.dispatch(nextStep(taskID));
  };
};

export default function(taskID: string, store: {dispatch: (action: any) => void}): TaskAPI {
  return {
    addDiagnostics: provideDiagnostics(taskID, store),
    nextStep: provideNextStep(taskID, store),
  };
};
