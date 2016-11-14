'use babel'
// @flow
import type {TargetConfig} from "../../TargetConfigurationFeature/Types/types.js.flow";
import type {Task} from "../Types/types.js.flow";
import {TasksControllerInstance} from "../Model/TasksController";
import {startTask} from "./StartTask";
import {addTask} from "./AddTask";
import {DevToolsControllerInstance} from "../../DevtoolLoadingFeature/Model/DevToolsController";
import IntegratedStager from "../Model/Stagers/IntegratedStager";
import {generateTaskID} from "../Model/id";
import moment from 'moment';
import PluginApi from "../../DiagnosticsFeature/Model/PluginApi";
import {failTask} from "./FailTask";
import {crashTask} from "./CrashTask";

export type RunAction = (dispatch: (action: mixed) => void) => void;

export function runTask(target: TargetConfig): RunAction {
  return (dispatch) => {
    let {strategy, controller} = DevToolsControllerInstance.getStrategy(target) || {};
    if (strategy == null || controller == null) {
      atom.notifications.addWarning("Task not launched : bad configuration");
      return;
    }
    let taskID = generateTaskID();
    let action = addTask(taskID.toString(), target, strategy, moment().unix());
    let taskAPI = PluginApi(taskID.toString(), {dispatch});
    dispatch(action);
    let child = IntegratedStager(strategy, {
      onStdoutData(data) { controller.onStdoutData(data, taskAPI) },
      onStderrData(data) { controller.onStderrData(data, taskAPI) },
      onExit(exitCode) { controller.onExit(exitCode, taskAPI); dispatch(crashTask(taskID.toString(), moment().unix())) },
      onError(err) { controller.onError(err, taskAPI); dispatch(crashTask(taskID.toString(), moment().unix())) },
    });
    if (child == null) {
      atom.notifications.addError("Error while running stager");
      return;
    }
    let execution = {task: action.payload.task, process: child};
    TasksControllerInstance.addExecution(execution);
    dispatch(startTask(taskID.toString()));
  };
};
