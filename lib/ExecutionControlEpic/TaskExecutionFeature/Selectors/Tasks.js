"use babel";
// @flow

import type { Task, TaskState } from "../Types/types";
import type { TasksReducer } from "../Reducers/Tasks";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types";
import { List } from "immutable";

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
): List<TaskState> {
  return state.byTaskID
    .reduce(
      (tasks, task) =>
        (state.byPlanID.get(plan.id) || List()).includes(task.id)
          ? tasks.push(task)
          : tasks,
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
): List<TaskState> {
  return state.byTaskID
    .reduce(
      (tasks, task) =>
        (state.byToolID.get(toolId) || List()).includes(task.id)
          ? tasks.push(task)
          : tasks,
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
): List<string> {
  return state.byTaskID
    .reduce(
      (tasks, task) =>
        (state.byPlanID.get(plan.id) || List()).includes(task.id) &&
        task.state == "running"
          ? tasks.push(task)
          : tasks,
      List(),
    )
    .update(values =>
      values.count() > 0 ? (values.has(0) ? values.get(0).id : null) : null,
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
      plan && (state.byPlanID.get(plan.id) || List()).includes(task.id)
        ? tasks.push(task)
        : tasks,
    List(),
  );
}
