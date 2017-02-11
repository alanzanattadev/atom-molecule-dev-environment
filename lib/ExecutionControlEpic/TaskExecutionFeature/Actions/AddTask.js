'use babel'
// @flow
import type {Task, DevToolInfos, Strategy} from "../Types/types.js.flow";

export type AddTaskAction = {
  type: 'ADD_TASK',
  payload: {
    task: Task
  };
};

export function addTask(id: string, target: {config: mixed, tool: DevToolInfos}, strategy: Strategy, date: number): AddTaskAction {
  return {
    type: 'ADD_TASK',
    payload: {
      task: {
        id,
        target,
        strategy,
        step: 0,
        state: "created",
        debut: date,
      }
    }
  };
};
