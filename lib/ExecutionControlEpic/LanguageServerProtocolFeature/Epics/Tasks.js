"use babel";
// @flow

import type { RunTaskAction } from "../../TaskExecutionFeature/Actions/RunTask";
import { addTask } from "../../TaskExecutionFeature/Actions/AddTask";
import { startTask } from "../../TaskExecutionFeature/Actions/StartTask";
import { stopTask } from "../../TaskExecutionFeature/Actions/StopTask";
import { runLanguageClient } from "../Model/MoleculeLanguageClient";
import { selectPackagesReducer } from "../../../GlobalSystem/Selectors";
import { selectPackagesOfTool } from "../../../ProjectSystemEpic/PackageFeature/Selectors/Packages";
import Execution from "../Model/Execution";
import { api } from "../../QuestionSystemFeature/Model/api";
import currentDate from "moment";
import { bufferConsoleLogsForTask } from "../../ConsoleFeature/Actions/BufferConsoleLog";
import {
  ConsoleLogError,
  ConsoleLogInformation,
} from "../../ConsoleFeature/Types/types";
import { EditorFileObservable } from "../../../EventSystemEpic/EditorFeature/Model/EditorFileObservable";
import { editorFileEvents } from "./editorFileEvents";
import { bufferDiagnostics } from "./bufferDiagnostics";
import { languageClientGetActions } from "./languageClient";
import { empty, merge, Observable } from "rxjs";
import { catchError, mergeMap, share } from "rxjs/operators";

type ExecutionContext = {
  atom: AtomContext,
  molecule: MoleculeContext,
  node: NodeContext,
  extended: ExtendedContext,
};

export default (context: ExecutionContext) => (action$, store) => {
  const rootObs = action$.ofType("RUN_TASK").pipe(
    mergeMap((action: RunTaskAction) => {
      return Observable.create(async observer => {
        let execution = null;
        let languageClientSub = null;
        let fileEventSub = null;

        try {
          const { connection, stager } = runLanguageClient({
            plan: action.payload.plan,
            stagerConfig: action.payload.stager,
          });

          const jsonrpcTrace$ = Observable.create(async jsonObserver => {
            const tracer = { log: logData => jsonObserver.next(logData) };
            connection._connection.trace("verbose", tracer, {
              // traceFormat: "json",
              traceFormat: "text",
            });
            connection._connection.onDispose(jsonObserver.complete);
          });
          jsonrpcTrace$.subscribe(logData =>
            observer.next(
              // TODO - Remove hard-coded values
              bufferConsoleLogsForTask({
                source: "Molecule",
                color: "#592b71",
                version: "0.4.0",
                severity: ConsoleLogInformation,
                message: logData,
                date: currentDate().format("DD-MM-YYYY kk:mm:ss"),
              }),
            ),
          );

          const taskID = context.molecule.generateTaskID();

          languageClientSub = languageClientGetActions(
            taskID,
            connection,
            api.ask,
            action$,
            action.payload.plan,
          ).subscribe(lspAction => observer.next(lspAction));

          connection.listen();

          const strategy = await connection.sendRequest("strategy/init", {});
          const addTaskAction = addTask(
            taskID.toString(),
            { ...action.payload.plan, state: undefined },
            strategy,
            context.node.getCurrentDate(),
          );
          observer.next(addTaskAction);

          stager.on("killed", () => {
            observer.next(
              stopTask(
                taskID.toString(),
                action.payload.plan.name,
                context.node.getCurrentDate(),
              ),
            );
            observer.complete();
          });

          execution = new Execution({ task: addTaskAction.payload.task });

          if (strategy.type === "terminal") {
            execution.initTerminal();

            execution.onTerminalData(data => {
              connection.sendNotification("terminal/input", {
                data: data,
              });
            });

            execution.onTerminalResize(info => {
              connection.sendNotification("terminal/resize", {
                cols: info.cols,
                rows: info.rows,
              });
            });

            connection.onNotification("terminal/output", ({ data }) => {
              execution.terminal.write(data);
              execution.broker.emit("terminal/output", { data });
            });
          }

          context.molecule.ExecutionsController.setExecution(execution);

          // NOTE: if the code in `onRequest("initialize", ...)` in
          // runController() throws an Error, vscode-jsonrpc will transmit that
          // error, and `sendRequest("initialize", ...)` will throw the same
          // error
          // It is an undocumented feature of vscode-jsonrpc
          await connection.initialize({
            processId: process.pid,
            trace: "verbose",
            rootUri: action.payload.plan.packageInfo.path,
            capabilities: {
              workspace: {},
              textDocument: {},
            },
          });

          // NOTE: file events must be subscribed after the language server is
          // initialized, so that the initial file events can trigger linting
          const fileEvent$ = editorFileEvents(EditorFileObservable);
          fileEventSub = fileEvent$.subscribe(event =>
            connection.sendNotification(
              "textDocument/" + event.message,
              event.args,
            ),
          );

          connection.sendNotification("packages/didChange", {
            packages: selectPackagesOfTool(
              selectPackagesReducer(store.getState()),
              action.payload.plan.tool.id,
            ),
          });
          observer.next(startTask(taskID.toString()));
        } catch (err) {
          console.error(err);
          const plan = action.payload.plan;
          observer.next(
            // TODO - Remove hard-coded values
            bufferConsoleLogsForTask({
              source: "Molecule",
              color: "#592b71",
              version: "0.4.0",
              severity: ConsoleLogError,
              message: `Error loading devtool ${plan.tool.name} for plan ${
                plan.name
              }: ${err.message}`,
              date: currentDate().format("DD-MM-YYYY kk:mm:ss"),
            }),
          );
          observer.complete();
        }

        return function unsubscribe() {
          if (execution && execution.terminal) {
            execution.terminal.writeln(`\n\rProgram exited`);
            execution.stopTerminal();
          }
          if (languageClientSub) {
            languageClientSub.unsubscribe();
          }
          if (fileEventSub) {
            fileEventSub.unsubscribe();
          }
        };
      });
    }),
    share(),
    catchError(err => {
      console.error(err);
      return empty();
    }),
  );

  const [diagnosticAction$, otherAction$] = rootObs.partition(
    action =>
      action.type === "SET_DIAGNOSTICS_FOR_PATH_FOR_TASK" ||
      action.type === "REMOVE_DIAGNOSTICS_OF_TASK",
  );
  return merge(bufferDiagnostics(diagnosticAction$), otherAction$);
};
