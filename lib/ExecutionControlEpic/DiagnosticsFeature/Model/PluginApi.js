"use babel";
// @flow

import type { PluginDiagnostic } from "../Types/types.js.flow";
import type { TaskAPI } from "../../DevtoolLoadingFeature/Types/types.js.flow";
import { nextStep } from "../../TaskExecutionFeature/Actions/NextStep";
import { selectTaskOfID } from "../../TaskExecutionFeature/Selectors/Tasks";
import { selectTasksReducer } from "../../../GlobalSystem/Selectors";
import getCacheAPI from "../../CacheSystemFeature/Model/CacheApi";
import { addDiagnosticsForTask } from "../Actions/AddDiagnosticsForTask";

export function provideDiagnostics(
  taskID: string,
  store: { dispatch: (action: any) => void, getState: () => any },
): (diagnostics: Array<PluginDiagnostic>) => void {
  return function(diagnostics: Array<PluginDiagnostic>): void {
    let task = selectTaskOfID(selectTasksReducer(store.getState()), taskID);
    store.dispatch(
      addDiagnosticsForTask(
        diagnostics.map(diagnostic =>
          Object.assign({}, diagnostic, { task: taskID, step: task.step }),
        ),
      ),
    );
  };
}

export function provideNextStep(
  taskID: string,
  store: { dispatch: (action: any) => void, getState: () => any },
): () => void {
  return function(): void {
    store.dispatch(nextStep(taskID));
  };
}

export default function(
  taskID: string,
  store: { dispatch: (action: any) => void, getState: () => any },
): TaskAPI {
  return {
    addDiagnostics: provideDiagnostics(taskID, store),
    nextStep: provideNextStep(taskID, store),
    cache: getCacheAPI(taskID, store.getState, store.dispatch),
  };
}
