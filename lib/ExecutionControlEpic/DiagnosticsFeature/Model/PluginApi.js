"use babel";
// @flow

import type { PublishDiagnosticsParams } from "../Types/types.js.flow";
import type { TaskAPI } from "../../DevtoolLoadingFeature/Types/types.js.flow";
import { nextStep } from "../../TaskExecutionFeature/Actions/NextStep";
import { selectTaskOfID } from "../../TaskExecutionFeature/Selectors/Tasks";
import { selectTasksReducer } from "../../../GlobalSystem/Selectors";
import getCacheAPI from "../../CacheSystemFeature/Model/CacheApi";
import { waitingTask } from "../../TaskExecutionFeature/Actions/WaitingTask";
import { busyTask } from "../../TaskExecutionFeature/Actions/BusyTask";
import { setDiagnosticsForTask } from "../Actions/SetDiagnosticsForTask";

export function provideDiagnostics(
  taskID: string,
  store: { dispatch: (action: any) => void, getState: () => any },
): (publishDiagnostics: PublishDiagnosticsParams) => void {
  return function(publishDiagnostics: PublishDiagnosticsParams): void {
    let task = selectTaskOfID(selectTasksReducer(store.getState()), taskID);
    store.dispatch(
      setDiagnosticsForTask({
        uri: publishDiagnostics.uri,
        task: taskID,
        diagnostics: publishDiagnostics.diagnostics.map(diagnostic =>
          Object.assign({}, diagnostic, {
            task: taskID,
            step: task ? task.step : 1,
          }),
        ),
      }),
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

export function provideBusy(
  taskID: string,
  store: { dispatch: (action: any) => void, getState: () => any },
) {
  return {
    switchToBusyMode() {
      store.dispatch(busyTask(taskID));
    },
    switchToWaitingMode() {
      store.dispatch(waitingTask(taskID));
    },
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
    busy: provideBusy(taskID, store),
  };
}
