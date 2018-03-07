"use babel";
// @flow

import type { PlanConfig } from "../Types/types";

export type PinPlanConfigAction = {
  type: "PIN_PLAN_CONFIGURATION",
  payload: {
    planConfig: PlanConfig,
  },
};

export function pinPlanConfig(planConfig: PlanConfig): PinPlanConfigAction {
  return {
    type: "PIN_PLAN_CONFIGURATION",
    payload: {
      planConfig,
    },
  };
}
