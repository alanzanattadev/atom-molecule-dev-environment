"use babel";
// @flow

import Rx from "rxjs";
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
import { addConsoleLogsForTask } from "../../ConsoleFeature/Actions/AddConsoleLog";
import {
  ConsoleLogError,
  ConsoleLogInformation,
} from "../../LanguageServerProtocolFeature/Types/standard";
import { EditorFileObservable } from "../../../EventSystemEpic/EditorFeature/Model/EditorFileObservable";
import { editorFileEvents } from "./editorFileEvents";
import { bufferDiagnostics } from "./bufferDiagnostics";
import { languageClientGetActions } from "./languageClient";

type ExecutionContext = {
  atom: AtomContext,
  molecule: MoleculeContext,
  node: NodeContext,
  extended: ExtendedContext,
};

export default (context: ExecutionContext) => (action$, store) => {
  const rootObs = action$
    .ofType("RUN_TASK")
    .mergeMap((action: RunTaskAction) => {
      return Rx.Observable.create(async observer => {
        let execution = null;
        let languageClientSub = null;
        let fileEventSub = null;

        try {
          const { connection, stager } = runLanguageClient({
            plan: action.payload.plan,
            stagerConfig: action.payload.stager,
          });

          const jsonrpcTrace$ = Rx.Observable.create(async jsonObserver => {
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
              addConsoleLogsForTask({
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

          execution = new Execution({ task: addTaskAction.payload.task });
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
          const plan = action.payload.plan;
          observer.next(
            // TODO - Remove hard-coded values
            addConsoleLogsForTask({
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
    })
    .share()
    .catch(err => {
      console.error(err);
      return Rx.Observable.empty();
    });

  const [diagnosticAction$, otherAction$] = rootObs.partition(
    action =>
      action.type === "SET_DIAGNOSTICS_FOR_PATH_FOR_TASK" ||
      action.type === "REMOVE_DIAGNOSTICS_OF_TASK",
  );
  return Rx.Observable.merge(
    bufferDiagnostics(diagnosticAction$),
    otherAction$,
  );
};
