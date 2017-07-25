"use babel";
// @flow

import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";

export type StopTaskOfPlanAction = {
  type: "STOP_TASK_OF_PLAN",
  payload: {
    plan: PlanConfig,
    date: number,
  },
};

export function stopTaskOfPlan(
  plan: PlanConfig,
  date: number,
): StopTaskOfPlanAction {
  return {
    type: "STOP_TASK_OF_PLAN",
    payload: {
      plan,
      date,
    },
  };
}
