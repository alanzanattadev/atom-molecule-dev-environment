"use babel";
// @flow

import Rx from "rxjs";
import { Map } from "immutable";
import type { SetDiagnosticsForTaskAction } from "../../DiagnosticsFeature/Actions/SetDiagnosticsForTask";
import { setDiagnosticsForPathsForTasks } from "../../DiagnosticsFeature/Actions/SetDiagnosticsForPathsForTasks";

function convertSetDiagnosticsForPathToSetDiagnosticsForTasks(
  actions: Array<SetDiagnosticsForTaskAction>,
) {
  return setDiagnosticsForPathsForTasks(
    actions
      .reduce((red, action) => {
        return red.update(
          action.payload.task,
          Map({ taskId: action.payload.task, paths: Map() }),
          taskDef =>
            taskDef.setIn(["paths", action.payload.uri], {
              path: action.payload.uri,
              diagnostics: action.payload.diagnostics,
            }),
        );
      }, Map())
      .toList()
      .map(taskDef =>
        taskDef.update("paths", paths => paths.toList().toArray()).toObject(),
      )
      .toArray(),
  );
}

export function bufferDiagnostics(diagnosticAction$) {
  return diagnosticAction$
    .bufferWhen(() => Rx.Observable.interval(100))
    .filter(buffer => buffer.length > 0)
    .concatMap(buffer =>
      Rx.Observable.create(observer => {
        let diagnosticsActions = [];

        buffer.forEach(action => {
          if (action.type === "REMOVE_DIAGNOSTICS_OF_TASK") {
            if (diagnosticsActions.length > 0) {
              observer.next(
                convertSetDiagnosticsForPathToSetDiagnosticsForTasks(
                  diagnosticsActions,
                ),
              );
              diagnosticsActions = [];
            }
            observer.next(action);
          } else {
            diagnosticsActions.push(action);
          }
        });
        if (diagnosticsActions.length > 0)
          observer.next(
            convertSetDiagnosticsForPathToSetDiagnosticsForTasks(
              diagnosticsActions,
            ),
          );
        observer.complete();
      }),
    );
}
