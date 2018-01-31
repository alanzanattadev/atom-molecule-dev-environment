"use babel";
// @flow

import type { Task, TaskState } from "../Types/types.js.flow";
import type { TasksReducer } from "../Reducers/Tasks";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import { List } from "immutable";

export function selectMostPertinentTaskOf(taskA: Task, taskB: Task) {
  if (taskA.state == "running" && taskB.state != "running") return taskA;
  else if (taskB.state == "running" && taskA.state != "running") return taskB;
  else if (taskA.state == null) return taskB;
  else if (taskB.state == null) return taskA;
  else if (taskA.end && taskB.end) return taskA.end < taskB.end ? taskB : taskA;
  else if (taskB.end) return taskB;
  else return taskA;
}

export function selectPertinentTask(state: List<Task>): Task {
  let runningTask = state.find(task => task.state == "running");
  if (runningTask) return runningTask;
  else {
    const check = state.reduce(
      (red, task) => {
        if (red.state == null) return task;
        else if (red.end && task.end) return red.end < task.end ? task : red;
        else if (task.end) return task;
        else return red;
      },
      { state: null },
    );
    return check.state ? check : null;
  }
}

export function selectStateOfPlan(
  state: TasksReducer,
  plan: PlanConfig,
): TaskState {
  return state.byTaskID
    .reduce(
      (tasks, task) =>
        state.byPlanID.get(task.id) == plan.id ? tasks.push(task) : tasks,
      List(),
    )
    .update(values => {
      let task = selectPertinentTask(values);
      if (task) return task.state;
      else return null;
    });
}

export function selectStateOfTool(
  state: TasksReducer,
  toolId: string,
): TaskState {
  return state.byTaskID
    .reduce(
      (tasks, task) =>
        state.byToolID.get(task.id) == toolId ? tasks.push(task) : tasks,
      List(),
    )
    .update(values => {
      let task = selectPertinentTask(values);
      if (task) return task.state;
      else return null;
    });
}

export function selectTaskIDOfRunningPlan(
  state: TasksReducer,
  plan: PlanConfig,
): string {
  return state.byTaskID
    .reduce(
      (tasks, task) =>
        state.byPlanID.get(task.id) == plan.id && task.state == "running"
          ? tasks.push(task)
          : tasks,
      List(),
    )
    .update(
      values =>
        values.count() > 0 ? (values.has(0) ? values.get(0).id : null) : null,
    );
}

export function selectTasksOfTool(state: TasksReducer, toolId: string) {
  return state.byTaskID.reduce(
    (tasks, task) =>
      state.byToolID.get(task.id) == toolId ? tasks.push(task) : tasks,
    List(),
  );
}

export function selectPertinentTaskID(tasks: List<Task>): ?string {
  let task = selectPertinentTask(tasks);
  return task ? task.id : null;
}

export function selectTaskOfID(state: TasksReducer, taskId: string): ?Task {
  return state.byTaskID.has(taskId) ? state.byTaskID.get(taskId) : null;
}

export function selectTasksOfPlan(
  state: TasksReducer,
  plan: PlanConfig,
): List<Task> {
  return state.byTaskID.reduce(
    (tasks, task) =>
      state.byPlanID.get(task.id) == plan.id ? tasks.push(task) : tasks,
    List(),
  );
}
