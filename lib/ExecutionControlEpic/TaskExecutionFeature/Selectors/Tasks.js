'use babel'
// @flow

import type {TaskState, DevToolInfos, Task} from "../Types/types.js.flow";
import { fromJS, is } from "immutable";
import type {TasksReducer} from "../Reducers/Tasks";
import {areSamePlans} from "../../PlanConfigurationFeature/Model/PlanManipulators";
import type {PlanConfig} from "../../PlanConfigurationFeature/Types/types.js.flow";

export function selectMostPertinentTaskOf(taskA: Task, taskB: Task) {
  if (taskA.state == 'running' && taskB.state != 'running')
    return taskA;
  else if (taskB.state == 'running' && taskA.state != 'running')
    return taskB;
  else if (taskA.state == null)
    return taskB;
  else if (taskB.state == null)
    return taskA;
  else if (taskA.end && taskB.end)
    return taskA.end < taskB.end ? taskB : taskA;
  else if (taskB.end)
    return taskB;
  else
    return taskA;
}

export function selectPertinentTask(state: TasksReducer): Task {
  let tasks = fromJS(state);
  let runningTask = tasks.find(task => task.get('state') == "running");
  if (runningTask)
    return runningTask.toJS();
  else {
    return tasks.reduce((red, task) => {
      if (red.get('state') == null)
        return task;
      else if (red.get('end') && task.get('end'))
        return red.get('end') < task.get('end') ? task : red;
      else if (task.get('end'))
        return task;
      else
        return red;
    }, fromJS({state: null})).update(task => task.get('state') ? task.toJS() : null);
  };
};

export function selectStateOfPlan(state: TasksReducer, plan: PlanConfig): TaskState {
  return fromJS(state)
          .filter(task => areSamePlans(task.get('plan').toJS(), plan))
          .update(values => {
            let task = selectPertinentTask(values.toJS());
            if (task)
              return task.state;
            else
              return null;
          });
};

export function selectStateOfTool(state: TasksReducer, toolId: string): TaskState {
  return fromJS(state)
          .filter(task => task.getIn(['plan', 'tool', 'id']) == toolId)
          .update(values => {
            let task = selectPertinentTask(values.toJS());
            if (task)
              return task.state;
            else
              return null;
          });
};

export function selectTaskIDOfRunningPlan(state: TasksReducer, plan: PlanConfig): string {
  return fromJS(state)
          .filter(task => areSamePlans(task.get('plan').toJS(), plan) && task.get('state') == "running")
          .update(tasks => tasks.count() > 0 ? tasks.getIn([0, 'id']) : null);
};

export function selectTasksOfTool(state: TasksReducer, toolId: string) {
  return fromJS(state)
          .filter(task => task.getIn(['plan', 'tool', 'id']) == toolId)
          .toJS();
};

export function selectPertinentTaskID(state: TasksReducer): string {
  let task = selectPertinentTask(state);
  return task ? task.id : null;
};

export function selectTaskOfID(state: TasksReducer, taskId: string) {
  let foundTask = fromJS(state).find(task => task.get('id') == taskId);
  if (foundTask)
    return foundTask.toJS();
  else
    return null;
}
