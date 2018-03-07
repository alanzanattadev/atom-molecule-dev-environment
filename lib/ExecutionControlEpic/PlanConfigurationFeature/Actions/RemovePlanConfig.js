"use babel";
// @flow

import type { PlanConfig } from "../Types/types";

export type RemovePlanConfigAction = {
  type: "REMOVE_PLAN_CONFIGURATION",
  payload: {
    planConfig: PlanConfig,
  },
};

export function removePlanConfig(
  planConfig: PlanConfig,
): RemovePlanConfigAction {
  return {
    type: "REMOVE_PLAN_CONFIGURATION",
    payload: {
      planConfig,
    },
  };
}
