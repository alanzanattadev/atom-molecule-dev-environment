"use babel";
// @flow

import type {
  PlanConfig,
} from "../../PlanConfigurationFeature/Types/types.js.flow";
import { TasksControllerInstance } from "../Model/TasksController";
import { startTask } from "./StartTask";
import { addTask } from "./AddTask";
import {
  DevToolsControllerInstance,
} from "../../DevtoolLoadingFeature/Model/DevToolsController";
import GetStager from "../Model/Stagers";
import { generateTaskID } from "../Model/id";
import moment from "moment";
import PluginApi from "../../DiagnosticsFeature/Model/PluginApi";
import { crashTask } from "./CrashTask";
import { fromJS } from "immutable";
import helperApi from "../Model/HelperApi";
import Terminal from "xterm";

export type RunAction = (dispatch: (action: mixed) => void) => void;

export function runTask(plan: PlanConfig): RunAction {
  return (dispatch, getState) => {
    let { strategy, controller } = DevToolsControllerInstance.getStrategy(
      plan,
    ) || {};
    if (strategy == null || controller == null) {
      global.atom.notifications.addWarning(
        "Task not launched : bad configuration",
      );
      return;
    }
    let taskID = generateTaskID();
    let action = addTask(
      taskID.toString(),
      fromJS(plan).remove("state").toJS(),
      strategy,
      moment().unix(),
    );
    dispatch(action);
    let stager = GetStager(plan.stager.type, plan.stager);
    if (stager == null) {
      global.atom.notifications.addWarning("Task not launched : bad stager");
      return;
    }
    let taskAPI = PluginApi(taskID.toString(), { dispatch, getState });
    const term = strategy.type === "shell"
      ? new Terminal({
          cols: 80,
          rows: 17,
        })
      : undefined;
    function handleKeyDown(e) {
      if (e.keyCode == 8) {
        term.write("\b\ ");
      } else if (!e.altKey && !e.altGraphKey && !e.ctrlKey && !e.metaKey) {
        term.write(e.key);
      }
    }
    if (term !== undefined) {
      term.on("keydown", handleKeyDown);
    }
    let child = stager(strategy, {
      onData(data) {
        if (strategy.type === "shell") {
          term.write(data);
        }
        if ("onData" in controller) {
          controller.onData(data, taskAPI, helperApi);
        }
      },
      onExit(exitCode) {
        if (strategy.type === "shell") {
          term.off("data", handleData);
          term.writeln(`\nProgram exited with code ${exitCode}`);
          term.off("keydown", handleKeyDown);
        }
        if ("onExit" in controller) {
          controller.onExit(exitCode, taskAPI, helperApi);
        }
        dispatch(crashTask(taskID.toString(), moment().unix()));
      },
      onError(err) {
        if ("onError" in controller) {
          if (
            !(err.code === "EIO" &&
              err.errno === "EIO" &&
              err.syscall === "read")
          )
            controller.onError(err, taskAPI, helperApi);
        }
        dispatch(crashTask(taskID.toString(), moment().unix()));
      },
    });
    if (child == null) {
      global.atom.notifications.addError("Error while running stager");
      return;
    }
    function handleData(data) {
      child.write(data);
    }
    if (term !== undefined && child != null && strategy.type === "shell") {
      term.on("data", handleData);
    }
    let execution = {
      task: action.payload.task,
      process: child,
      terminal: term,
    };
    TasksControllerInstance.addExecution(execution);
    dispatch(startTask(taskID.toString()));
  };
}
