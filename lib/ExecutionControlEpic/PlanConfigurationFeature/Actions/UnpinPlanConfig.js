"use babel";
// @flow

import type { PlanConfig } from "../Types/types";

export type UnpinPlanConfigAction = {
  type: "UNPIN_PLAN_CONFIGURATION",
  payload: {
    planConfig: PlanConfig,
  },
};

export function unpinPlanConfig(planConfig: PlanConfig): UnpinPlanConfigAction {
  return {
    type: "UNPIN_PLAN_CONFIGURATION",
    payload: {
      planConfig,
    },
  };
}
