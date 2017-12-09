"use babel";
// @flow

import type { DevToolInfos, Strategy, Task } from "../Types/types.js.flow";

export type AddTaskAction = {
  type: "ADD_TASK",
  payload: {
    task: Task,
  },
};

export function addTask(
  id: string,
  plan: { config: mixed, tool: DevToolInfos },
  strategy: Strategy,
  date: number,
): AddTaskAction {
  return {
    type: "ADD_TASK",
    payload: {
      task: {
        id: id,
        plan: plan,
        strategy: strategy,
        step: 0,
        state: "created",
        debut: date,
        busy: false,
        terminal: true,
      },
    },
  };
}
