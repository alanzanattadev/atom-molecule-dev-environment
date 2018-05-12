"use babel";
// @flow

import type { Strategy, Task } from "../Types/types";
import type { DevToolInfo } from "../../PlanConfigurationFeature/Types/types";

export type AddTaskAction = {
  type: "ADD_TASK",
  payload: {
    task: Task,
  },
};

export function addTask(
  id: string,
  plan: { config: mixed, tool: DevToolInfo },
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
