"use babel";
// @flow

import type { Task } from "../Types/types";
import { Map, Record } from "immutable";

export default function(
  state: TasksReducer = new TasksReducerRecord(),
  action: any,
): TasksReducer {
  switch (action.type) {
    case "ADD_TASK":
      return state
        .update("byTaskID", byTaskID =>
          byTaskID.set(action.payload.task.id, action.payload.task),
        )
        .update("byPlanID", byPlanID =>
          byPlanID.set(action.payload.task.id, action.payload.task.plan.id),
        )
        .update("byToolID", byToolID =>
          byToolID.set(
            action.payload.task.id,
            action.payload.task.plan.tool.id,
          ),
        );
    case "START_TASK":
      return state.update(
        "byTaskID",
        byTaskID =>
          byTaskID.has(action.payload.id)
            ? state.byTaskID.update(
                action.payload.id,
                task =>
                  task.state == "created"
                    ? { ...task, state: "running", end: action.payload.date }
                    : task,
              )
            : byTaskID,
      );
    case "STOP_TASK":
      return state.update(
        "byTaskID",
        byTaskID =>
          byTaskID.has(action.payload.id)
            ? state.byTaskID.update(
                action.payload.id,
                task =>
                  task.state == "running"
                    ? { ...task, state: "stopped", end: action.payload.date }
                    : task,
              )
            : byTaskID,
      );
    case "KILL_TASK":
    case "STOP_TASK_OF_PLAN":
      return state.update("byTaskID", byTaskID =>
        byTaskID.map(
          task =>
            task.state == "running" &&
            state.byPlanID.get(task.id) == action.payload.plan.id
              ? { ...task, state: "stopped", end: action.payload.date }
              : task,
        ),
      );
    case "CRASH_TASK":
      return state.update(
        "byTaskID",
        byTaskID =>
          byTaskID.has(action.payload.id)
            ? state.byTaskID.update(
                action.payload.id,
                task =>
                  task.state == "running"
                    ? { ...task, state: "crashed", end: action.payload.date }
                    : task,
              )
            : byTaskID,
      );
    case "FAIL_TASK":
      return state.update(
        "byTaskID",
        byTaskID =>
          byTaskID.has(action.payload.id)
            ? state.byTaskID.update(
                action.payload.id,
                task =>
                  task.state == "running"
                    ? { ...task, state: "failed", end: action.payload.date }
                    : task,
              )
            : byTaskID,
      );
    case "SUCCEED_TASK":
      return state.update(
        "byTaskID",
        byTaskID =>
          byTaskID.has(action.payload.id)
            ? state.byTaskID.update(
                action.payload.id,
                task =>
                  task.state == "running"
                    ? { ...task, state: "succeed", end: action.payload.date }
                    : task,
              )
            : byTaskID,
      );
    case "NEXT_STEP":
      return state.update(
        "byTaskID",
        byTaskID =>
          byTaskID.has(action.payload.id)
            ? state.byTaskID.update(action.payload.id, task => ({
                ...task,
                step: task.step + 1,
              }))
            : byTaskID,
      );
    case "BUSY_TASK":
      return state.update(
        "byTaskID",
        byTaskID =>
          byTaskID.has(action.payload.id)
            ? state.byTaskID.update(action.payload.id, task => ({
                ...task,
                busy: true,
              }))
            : byTaskID,
      );
    case "WAITING_TASK":
      return state.update(
        "byTaskID",
        byTaskID =>
          byTaskID.has(action.payload.id)
            ? state.byTaskID.update(action.payload.id, task => ({
                ...task,
                busy: false,
              }))
            : byTaskID,
      );
    case "TERMINAL_INITIALIZED":
      return state.update(
        "byTaskID",
        byTaskID =>
          byTaskID.has(action.payload.id)
            ? state.byTaskID.update(action.payload.id, task => ({
                ...task,
                terminal: true,
              }))
            : byTaskID,
      );
    default:
      return state;
  }
}

export const TasksReducerRecord = Record({
  byTaskID: Map(),
  byPlanID: Map(),
  byToolID: Map(),
});

export type TasksReducer = {
  byTaskID: Map<string, Task>,
  byPlanID: Map<string, string>,
  byToolID: Map<string, string>,
};
