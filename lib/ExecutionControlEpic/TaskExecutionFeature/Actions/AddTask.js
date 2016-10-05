'use babel'
// @flow
import type {Task, DevToolInfos} from "../Types/types.js.flow";

export type AddTaskAction = {
  type: 'ADD_TASK',
  payload: {
    task: Task
  };
};

export function addTask(id: string, target: {config: mixed, tool: DevToolInfos}): AddTaskAction {
  return {
    type: 'ADD_TASK',
    payload: {
      task: {
        id,
        target,
        state: "created",
      }
    }
  };
};
