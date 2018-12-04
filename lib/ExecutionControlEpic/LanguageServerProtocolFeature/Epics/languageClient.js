"use babel";
// @flow

import Rx from "rxjs";
import currentDate from "moment";
import { waitingTask } from "../../TaskExecutionFeature/Actions/WaitingTask";
import { busyTask } from "../../TaskExecutionFeature/Actions/BusyTask";
import type { Diagnostic } from "../../LanguageServerProtocolFeature/Types/standard";
import { setDiagnosticsForTask } from "../../DiagnosticsFeature/Actions/SetDiagnosticsForTask";
import { removeDiagnosticsForTask } from "../../DiagnosticsFeature/Actions/RemoveDiagnosticsForTask";
import { bufferConsoleLogsForTask } from "../../ConsoleFeature/Actions/BufferConsoleLog";
import type LanguageServerConnection from "./LanguageServerConnection";

export function languageClientGetActions(
  taskID: number,
  languageClientConnection: LanguageServerConnection,
  askAPI: any,
  action$,
  planConfig: any,
) {
  return Rx.Observable.create(async observer => {
    languageClientConnection.onRequest(
      "window/showMessageRequest",
      async data => {
        if (data) {
          const response = await askAPI([
            {
              name: "answer",
              type: "list",
              choices: data.actions.map(action => ({
                value: action.title,
                description: action.title,
              })),
              message: data.message,
            },
          ]);
          // TODO - I think it should be `return ... ? response.answer : null`
          return response != null
            ? { result: response.answer }
            : { error: true };
        }
      },
    );

    languageClientConnection.onNotification("window/logMessage", data => {
      observer.next(
        // TODO - Remove hard-coded values
        bufferConsoleLogsForTask({
          source: "Molecule",
          color: "#592b71",
          version: "0.4.0",
          severity: data.type,
          message: data.message,
          date: currentDate().format("DD-MM-YYYY kk:mm:ss"),
        }),
      );
    });

    languageClientConnection.onNotification(
      "textDocument/publishDiagnostics",
      (diagnostics: { diagnostics: Array<Diagnostic>, uri: string }) => {
        observer.next(
          setDiagnosticsForTask({
            uri: diagnostics.uri,
            task: taskID,
            diagnostics: diagnostics.diagnostics.map(diagnostic =>
              Object.assign({}, diagnostic, {
                path: diagnostics.uri,
                task: taskID.toString(),
              }),
            ),
          }),
        );
      },
    );

    languageClientConnection.onNotification(
      "workspace/publishDiagnostics",
      (diagnostics: { diagnostics: Array<Diagnostic>, workspace: string }) => {
        observer.next(
          setDiagnosticsForTask({
            uri: diagnostics.workspace,
            task: taskID,
            diagnostics: diagnostics.diagnostics.map(diagnostic =>
              Object.assign({}, diagnostic, {
                path: diagnostics.workspace,
                task: taskID.toString(),
              }),
            ),
          }),
        );
      },
    );

    languageClientConnection.onNotification(
      "workspace/clearDiagnostics",
      () => {
        observer.next(removeDiagnosticsForTask(taskID));
      },
    );

    languageClientConnection.onNotification(
      "workspace/busy",
      (args: { isBusy: boolean }): void => {
        observer.next(args.isBusy ? busyTask(taskID) : waitingTask(taskID));
      },
    );

    const killTaskAction$ = action$
      .ofType("KILL_TASK")
      .filter(action => action.payload.plan.id === planConfig.id);

    const killTaskActionSub = killTaskAction$.subscribe(async () => {
      await languageClientConnection.sendRequest("shutdown");
      languageClientConnection.sendNotification("exit");
      observer.complete();
    });

    return function unsubscribe() {
      killTaskActionSub.unsubscribe();
    };
  });
}
