"use babel";
// @flow

import type { PlanConfig } from "../Types/types.js.flow";

export type UnpinPlanConfigAction = {
  type: "UNPIN_TARGET_CONFIGURATION",
  payload: {
    planConfig: mixed
  }
};

export function unpinPlanConfig(planConfig: PlanConfig): UnpinPlanConfigAction {
  return {
    type: "UNPIN_TARGET_CONFIGURATION",
    payload: {
      planConfig
    }
  };
}
