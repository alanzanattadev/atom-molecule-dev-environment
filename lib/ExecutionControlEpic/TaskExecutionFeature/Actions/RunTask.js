"use babel";
// @flow

import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types";

export type RunTaskAction = {
  type: "RUN_TASK",
  payload: {
    plan: PlanConfig,
  },
};

export function runTask(plan: PlanConfig): RunTaskAction {
  return {
    type: "RUN_TASK",
    payload: {
      plan,
    },
  };
}
