'use babel'
// @flow
import type {TargetConfig} from "../../TargetConfigurationFeature/Types/types.js.flow";
import type {Task} from "../Types/types.js.flow";
import {TasksControllerInstance} from "../Model/TasksController";
import {startTask} from "./StartTask";
import {addTask} from "./AddTask";
import {DevToolsControllerInstance} from "../../DevtoolLoadingFeature/Model/DevToolsController";
import GetStager from "../Model/Stagers";
import {generateTaskID} from "../Model/id";
import moment from 'moment';
import PluginApi from "../../DiagnosticsFeature/Model/PluginApi";
import {failTask} from "./FailTask";
import {crashTask} from "./CrashTask";
import { fromJS } from "immutable";

export type RunAction = (dispatch: (action: mixed) => void) => void;

export function runTask(target: TargetConfig): RunAction {
  return (dispatch) => {
    let {strategy, controller} = DevToolsControllerInstance.getStrategy(target) || {};
    if (strategy == null || controller == null) {
      atom.notifications.addWarning("Task not launched : bad configuration");
      return;
    }
    let taskID = generateTaskID();
    let action = addTask(taskID.toString(), fromJS(target).remove('state').toJS(), strategy, moment().unix());
    let taskAPI = PluginApi(taskID.toString(), {dispatch});
    dispatch(action);
    let stager = GetStager(target.stager.type, target.stager);
    if (stager == null) {
      atom.notifications.addWarning("Task not launched : bad stager");
      return;
    }
    let child = stager(strategy, {
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
