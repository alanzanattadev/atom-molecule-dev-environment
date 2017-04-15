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

export type RunAction = (dispatch: (action: mixed) => void) => void;

export function runTask(plan: PlanConfig): RunAction {
  return (dispatch, getState) => {
    let { strategy, controller } = DevToolsControllerInstance.getStrategy(
      plan,
    ) ||
      {};
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
    let child = stager(strategy, {
      onData(data) {
        if ("onData" in controller) {
          controller.onData(data, taskAPI, helperApi);
        }
      },
      onStdoutData(data) {
        if ("onStdoutData" in controller) {
          controller.onStdoutData(data, taskAPI, helperApi);
        }
      },
      onStderrData(data) {
        if ("onStderrData" in controller) {
          controller.onStderrData(data, taskAPI, helperApi);
        }
      },
      onExit(exitCode) {
        if ("onExit" in controller) {
          controller.onExit(exitCode, taskAPI, helperApi);
        }
        dispatch(crashTask(taskID.toString(), moment().unix()));
      },
      onError(err) {
        if ("onError" in controller) {
          controller.onError(err, taskAPI, helperApi);
        }
        dispatch(crashTask(taskID.toString(), moment().unix()));
      },
    });
    if (child == null) {
      global.atom.notifications.addError("Error while running stager");
      return;
    }
    let execution = { task: action.payload.task, process: child };
    TasksControllerInstance.addExecution(execution);
    dispatch(startTask(taskID.toString()));
  };
}
