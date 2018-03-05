"use babel";
// @flow

import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types";

export type KillTaskAction = {
  type: "KILL_TASK",
  payload: {
    plan: PlanConfig,
  },
};

export function killTask(plan: PlanConfig): KillTaskAction {
  return {
    type: "KILL_TASK",
    payload: {
      plan,
    },
  };
}
