"use babel";
// @flow

import Rx from "rxjs";
import { List, Map } from "immutable";
import { addTask } from "../../TaskExecutionFeature/Actions/AddTask";
import { startTask } from "../../TaskExecutionFeature/Actions/StartTask";
import { setDiagnosticsForTask } from "../../DiagnosticsFeature/Actions/SetDiagnosticsForTask";
import type { SetDiagnosticsForTaskAction } from "../../DiagnosticsFeature/Actions/SetDiagnosticsForTask";
import { runLanguageClient } from "../Model/MoleculeLanguageClient";
import Execution from "../Model/Execution";
import type { Diagnostic } from "../../LanguageServerProtocolFeature/Types/standard";
import { waitingTask } from "../../TaskExecutionFeature/Actions/WaitingTask";
import { busyTask } from "../../TaskExecutionFeature/Actions/BusyTask";
import { selectPackagesOfTool } from "../../../ProjectSystemEpic/PackageFeature/Selectors/Packages";
import { removeDiagnosticsForTask } from "../../DiagnosticsFeature/Actions/RemoveDiagnosticsForTask";
import { api } from "../../QuestionSystemFeature/Model/api";
import { selectPackagesReducer } from "../../../GlobalSystem/Selectors";
import { EditorFileObservable } from "../../../EventSystemEpic/EditorFeature/Model/EditorFileObservable";
import type { MoleculeAtomEditorEvent } from "../../../EventSystemEpic/EditorFeature/Types/editorEvents";
import { setDiagnosticsForPathsForTasks } from "../../DiagnosticsFeature/Actions/SetDiagnosticsForPathsForTasks";
import { killTask } from "../../TaskExecutionFeature/Actions/KillTask";

type ExecutionContext = {
  atom: AtomContext,
  molecule: MoleculeContext,
  node: NodeContext,
  extended: ExtendedContext,
};

export const RUN_TASK = "RUN_TASK";

export type RunAction = (dispatch: (action: mixed) => void) => void;

export type RunTaskAction = {
  type: typeof RUN_TASK,
  payload: { plan: PlanConfig },
};

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

export default (context: ExecutionContext) => (action$, store) => {
  const rootObs = action$
    .ofType(RUN_TASK)
    .mergeMap((action: RunTaskAction) => {
      return Rx.Observable.create(observer => {
        const languageClientConfig = runLanguageClient({
          plan: action.payload.plan,
          stagerConfig: action.payload.plan.stager,
        });

        let execution = null;
        let editorObservable = null;

        const taskID = context.molecule.generateTaskID();
        if (languageClientConfig.connection != null) {
          languageClientConfig.connection.onRequest(
            "strategy/init",
            ({ strategy }) => {
              const addTaskAction = addTask(
                taskID.toString(),
                { ...action.payload.plan, state: undefined },
                strategy,
                context.node.getCurrentDate(),
              );
              observer.next(addTaskAction);

              execution = new Execution({ task: addTaskAction.payload.task });
              context.molecule.ExecutionsController.setExecution(execution);
              observer.next(startTask(taskID.toString()));
              if (languageClientConfig.stager) {
                languageClientConfig.stager.on("killed", () => {
                  observer.next(killTask(action.payload.plan));
                });
              }
              return Promise.resolve({});
            },
          );

          editorObservable = EditorFileObservable.withLatestFrom(
            EditorFileObservable.scan((acc, event: MoleculeAtomEditorEvent) => {
              if (event.type === "didChange") {
                return {
                  ...acc,
                  [event.path]: (acc[event.path] || 0) + 1,
                };
              } else {
                return acc;
              }
            }, {}),
            (event: MoleculeAtomEditorEvent, versions) => ({
              message: event.type,
              args: {
                textDocument: {
                  uri: event.path,
                  version:
                    event.type === "didOpen" || event.type === "didChange"
                      ? versions[event.path] || 0
                      : undefined,
                  text:
                    event.type === "didOpen"
                      ? event.event.textEditor.getText()
                      : undefined,
                  languageId:
                    event.type === "didOpen"
                      ? event.event.textEditor.getGrammar().name
                      : undefined,
                },
                contentChanges:
                  event.type === "didChange"
                    ? event.event.changes.map(change => ({
                        range: {
                          start: {
                            character: change.newRange.start.column,
                            line: change.newRange.start.row,
                          },
                          end: {
                            character: change.newRange.end.column,
                            line: change.newRange.end.row,
                          },
                        },
                        text: change.newText,
                      }))
                    : undefined,
              },
            }),
          ).subscribe(event =>
            languageClientConfig.connection.sendNotification(
              "textDocument/" + event.message,
              event.args,
            ),
          );

          languageClientConfig.connection.sendNotification(
            "packages/didChange",
            {
              packages: selectPackagesOfTool(
                selectPackagesReducer(store.getState()),
                action.payload.plan.tool.id,
              ),
            },
          );

          languageClientConfig.connection.onRequest(
            "window/showMessageRequest",
            data => {
              if (data) {
                return api
                  .ask([
                    {
                      name: "answer",
                      type: "list",
                      choices: data.actions.map(action => ({
                        value: action.title,
                        description: action.title,
                      })),
                      message: data.message,
                    },
                  ])
                  .then(
                    response =>
                      (response != null && {
                        result: response.answer,
                      }) || {
                        error: true,
                      },
                  );
              }
            },
          );

          languageClientConfig.connection.onNotification(
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

          languageClientConfig.connection.onNotification(
            "workspace/publishDiagnostics",
            (diagnostics: {
              diagnostics: Array<Diagnostic>,
              workspace: string,
            }) => {
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

          languageClientConfig.connection.onNotification(
            "workspace/clearDiagnostics",
            () => {
              observer.next(removeDiagnosticsForTask(taskID));
            },
          );

          languageClientConfig.connection.onNotification(
            "workspace/busy",
            (args: { isBusy: boolean }): void => {
              observer.next(
                args.isBusy ? busyTask(taskID) : waitingTask(taskID),
              );
            },
          );

          languageClientConfig.connection.onNotification(
            "terminal/init",
            () => {
              if (execution) {
                execution.initTerminal();
              }
            },
          );

          languageClientConfig.connection.onNotification(
            "terminal/output",
            ({ data }) => {
              if (execution) {
                execution.terminal.write(data);
                execution.broker.emit("terminal/output", {
                  data,
                });
              }
            },
          );

          languageClientConfig.connection.listen();

          languageClientConfig.connection
            .initialize({
              processId: process.pid,
              trace: "verbose",
              rootUri: action.payload.plan.packageInfo.path,
              capabilities: {
                workspace: {},
                textDocument: {},
              },
            })
            .then(
              () => {
                if (execution && execution.terminal) {
                  execution.onTerminalData(data => {
                    languageClientConfig.connection.sendNotification(
                      "terminal/input",
                      {
                        data: data,
                      },
                    );
                  });

                  execution.onTerminalResize(info => {
                    languageClientConfig.connection.sendNotification(
                      "terminal/resize",
                      {
                        cols: info.cols,
                        rows: info.rows,
                      },
                    );
                  });
                }
              },
              err => {
                console.error("Error initializing:");
                console.error(err);
              },
            );
        } else {
          console.error("LSP connection is null");
        }

        return function unsubscribe() {
          if (languageClientConfig.connection != null) {
            languageClientConfig.connection.sendNotification("exit");
            if (execution) {
              if (execution.terminal) {
                execution.stopTerminal();
                execution.terminal.writeln(`\n\rProgram exited`);
              }
            }
            if (editorObservable != null) {
              editorObservable.unsubscribe();
            }
          }
        };
      }).takeUntil(
        action$.filter(
          a =>
            a.type === "KILL_TASK" &&
            a.payload.plan.tool.id === action.payload.plan.tool.id &&
            a.payload.plan.name === action.payload.plan.name,
        ),
      );
    })
    .share()
    .partition(
      action =>
        action.type === "SET_DIAGNOSTICS_FOR_PATH_FOR_TASK" ||
        action.type === "REMOVE_DIAGNOSTICS_OF_TASK",
    );
  const sharedDiagnosticObs = rootObs[0];
  return rootObs[1]
    .merge(
      sharedDiagnosticObs
        .bufferWhen(() =>
          Rx.Observable.interval(1000).merge(
            sharedDiagnosticObs.filter(
              action => action.type === "REMOVE_DIAGNOSTICS_OF_TASK",
            ),
          ),
        )
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
        ),
    )
    .catch(e => {
      console.error(e);
      return Rx.Observable.empty();
    });
};
