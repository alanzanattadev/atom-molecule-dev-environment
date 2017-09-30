"use babel";
// @flow

import Rx from "rxjs";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import { addTask } from "../Actions/AddTask";
import { crashTask } from "../Actions/CrashTask";
import { startTask } from "../Actions/StartTask";
import Terminal from "xterm";
import EventEmitter from "events";

export type RunAction = (dispatch: (action: mixed) => void) => void;

type NodeContext = {
  nodeProcess: Process,
  getCurrentDate: () => number,
};

type MoleculeContext = {
  devtoolsController: any,
  questionSystem: any,
  helperAPI: any,
  GetStager: any,
  PluginApi: any,
  TasksControllerInstance: any,
  generateTaskID: any,
};

type AtomContext = {
  notifications: any,
};

type ExtendedContext = {
  Terminal: Class<Terminal>,
};

type ExecutionContext = {
  atom: AtomContext,
  molecule: MoleculeContext,
  node: NodeContext,
  extended: ExtendedContext,
};

type ExecutionConfiguration = {
  taskID: any,
  strategy: any,
  getState: any,
  addTaskAction: any,
  controller: any,
  stager: any,
};

export const RUN_TASK = "RUN_TASK";

export const StrategyFromPlan = ({
  molecule: { devtoolsController, questionSystem, helperAPI },
  node: { nodeProcess },
}: ExecutionContext) => (plan: PlanConfig) =>
  Rx.Observable.create(function(observer) {
    let { strategy, controller } =
      devtoolsController.getStrategy(plan, helperAPI) || {};
    if (strategy == null || controller == null) {
      observer.error({
        type: "STRATEGY_ERROR",
        payload: {
          error: "Task not launched : bad configuration",
        },
      });
    } else {
      const env = { ...process.env, ...(strategy.env || {}) };
      if (strategy.type === "shell" || strategy.type === "terminal") {
        if (nodeProcess.platform === "win32") {
          questionSystem
            .ask([
              {
                type: "list",
                name: "shell",
                message: "Select a shell",
                default: "cmd.exe /c",
                choices: [
                  {
                    value: "powershell.exe -Command",
                    description: "powershell",
                  },
                  { value: "cmd.exe /c", description: "cmd" },
                  { value: "bash.exe -c", description: "bash" },
                ],
              },
            ])
            .then(answers => {
              if (answers === null) {
                observer.error({
                  type: "STRATEGY_ERROR",
                  payload: {
                    error: "Task not launched : Cancelled",
                  },
                });
              } else {
                const shell = answers.shell || "cmd.exe /c";
                observer.next({
                  strategy: {
                    ...strategy,
                    env,
                    shell,
                  },
                  controller,
                });
                observer.complete();
              }
            });
        } else {
          const shell = "bash -c";
          observer.next({
            strategy: {
              ...strategy,
              env,
              shell,
            },
            controller,
          });
          observer.complete();
        }
      } else {
        observer.next({
          strategy: {
            ...strategy,
            env,
          },
          controller,
        });
        observer.complete();
      }
    }
  });

export type RunTaskAction = {
  type: typeof RUN_TASK,
  payload: { plan: PlanConfig },
};

export const StagerFromPlan = ({ GetStager }) => plan =>
  Rx.Observable.create(observer => {
    const stager = GetStager(plan.stager.type, plan.stager);
    if (stager == null) observer.error("Task not launched : bad stager");
    else {
      observer.next(stager);
      observer.complete();
    }
  });

export const RunStrategy = ({
  atom: { notifications },
  molecule: { PluginApi, TasksControllerInstance, helperAPI },
  node: { getCurrentDate },
}: ExecutionContext) => ({
  taskID,
  strategy,
  getState,
  addTaskAction,
  controller,
  stager,
}: ExecutionConfiguration) => (handlers = {}, term) =>
  Rx.Observable.create(observer => {
    const broker = new EventEmitter();
    const task = addTaskAction.payload.task;
    const taskAPI = PluginApi(taskID.toString(), {
      dispatch: action => observer.next(action),
      getState,
    });
    let child = stager(strategy, {
      onData(data) {
        if (handlers.onData) {
          handlers.onData(data);
        }
        if ("onData" in controller) {
          controller.onData(data, taskAPI, helperAPI, () => child);
        }
        broker.emit("data", { task, data });
      },
      onExit(exitCode) {
        if (handlers.onExit) {
          handlers.onExit(exitCode);
        }
        if ("onExit" in controller) {
          controller.onExit(exitCode, taskAPI, helperAPI);
        }
        observer.next(crashTask(taskID.toString(), getCurrentDate()));
        observer.complete();
      },
      onError(err) {
        if ("onError" in controller) {
          if (
            !(
              err.code === "EIO" &&
              err.errno === "EIO" &&
              err.syscall === "read"
            )
          )
            controller.onError(err, taskAPI, helperAPI);
        }
        observer.next(crashTask(taskID.toString(), getCurrentDate()));
        observer.complete();
      },
    });
    if (child == null) {
      notifications.addError("Error while running stager");
      observer.error();
      return;
    } else {
      handlers.onStart(child);
    }
    let execution = {
      task,
      process: child,
      terminal: term,
      broker,
    };
    TasksControllerInstance.addExecution(execution);
    return function unsubscribe() {
      child.kill();
    };
  });

export const TerminalHandler = ({
  Terminal,
}: {
  Terminal: Class<Terminal>,
}) => exec =>
  Rx.Observable.create(observer => {
    const term = new Terminal({
      cols: 80,
      rows: 17,
    });
    function handleKeyDown(e) {
      if (e.keyCode == 8) {
        term.write("\b ");
      } else if (!e.altKey && !e.altGraphKey && !e.ctrlKey && !e.metaKey) {
        term.write(e.key);
      }
    }
    if (term !== undefined) {
      term.on("keydown", handleKeyDown);
    }

    let handleData = () => {};
    const child = exec(
      {
        onStart(child) {
          handleData = data => {
            child.write(data);
          };
          term.on("data", handleData);
          term.on("resize", ({ cols, rows }) => child.resize(cols, rows));
        },
        onData(data) {
          term.write(data);
        },
        onExit(exitCode) {
          term.off("data", handleData);
          term.writeln(`\nProgram exited with code ${exitCode}`);
          term.off("keydown", handleKeyDown);
        },
      },
      term,
    ).subscribe({
      next: event => {
        observer.next(event);
      },
      error: err => {
        observer.error(err);
      },
      complete: () => {
        observer.complete();
      },
    });

    return function unsubscribe() {
      child.unsubscribe();
    };
  });

export default (context: ExecutionContext) => (action$, store) =>
  action$.ofType(RUN_TASK).mergeMap((action: RunTaskAction) => {
    const strategy$ = StrategyFromPlan(context)(action.payload.plan).do(
      () => {},
      action => {
        context.atom.notifications.addWarning(action.payload.error);
      },
    );

    const stager$ = StagerFromPlan({ GetStager: context.molecule.GetStager })(
      action.payload.plan,
    ).do(() => {}, error => context.atom.notifications.addWarning(error));

    return Rx.Observable
      .zip(strategy$, stager$, (strategy, stager) => ({
        strategy,
        stager,
      }))
      .mergeMap(({ strategy: { strategy, controller }, stager }) => {
        const taskID = context.molecule.generateTaskID();
        const addTaskAction = addTask(
          taskID.toString(),
          { ...action.payload.plan, state: undefined },
          strategy,
          context.node.getCurrentDate(),
        );
        function getRunStrategy() {
          return RunStrategy(context)({
            addTaskAction,
            getState: store.getState.bind(store),
            strategy,
            controller,
            taskID,
            stager,
          });
        }
        return Rx.Observable.merge(
          Rx.Observable.of(addTaskAction),
          (strategy.type === "terminal"
            ? TerminalHandler({ Terminal })(getRunStrategy())
            : getRunStrategy()()
          )
            .takeUntil(
              action$.filter(
                a =>
                  a.type === "KILL_TASK" &&
                  a.payload.plan.tool.id === action.payload.plan.tool.id &&
                  a.payload.plan.name === action.payload.plan.name,
              ),
            )
            .merge(Rx.Observable.of(startTask(taskID.toString()))),
        );
      })
      .catch(() => Rx.Observable.empty());
  });
