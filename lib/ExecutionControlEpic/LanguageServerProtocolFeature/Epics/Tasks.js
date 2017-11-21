"use babel";
// @flow

import Rx from "rxjs";
import { addTask } from "../../TaskExecutionFeature/Actions/AddTask";
import { startTask } from "../../TaskExecutionFeature/Actions/StartTask";
import { runLanguageClient } from "../Model/MoleculeLanguageClient";

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

export default (context: ExecutionContext) => (action$, store) => {
  return action$
    .ofType(RUN_TASK)
    .mergeMap((action: RunTaskAction) => {
      return Rx.Observable.create(observer => {
        console.log("run language client");
        const languageClientConfig = runLanguageClient({
          plan: action.payload.plan,
          stagerConfig: action.payload.plan.stager,
        });

        const taskID = context.molecule.generateTaskID();

        if (languageClientConfig.connection != null) {
          languageClientConfig.connection.onRequest(
            "window/showMessageRequest",
            data => {
              if (data) {
                return api
                  .ask([data.questions])
                  .then(response => convertToLSPResponse(response));
              }
            },
          );

          languageClientConfig.connection.onNotification(
            "terminal/init",
            () => {
              console.log("terminal init");
            },
          );

          languageClientConfig.connection.listen();

          observer.next(
            addTask(
              taskID.toString(),
              { ...action.payload.plan, state: undefined },
              {},
              context.node.getCurrentDate(),
            ),
          );

          observer.next(startTask(taskID.toString()));
          languageClientConfig.connection.initialize({}).then(() => {});
        } else {
          console.log("LSP connection is null");
        }

        return function unsubscribe() {
          if (languageClientConfig.connection != null) {
            languageClientConfig.connection.sendNotification("exit");
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
    .catch(() => Rx.Observable.empty());
};
