"use babel";
// @flow

import { fromJS } from "immutable";
import type { PlanConfig } from "../Types/types.js";

export type PinPlanConfigAction = {
  type: "REMOVE_TARGET_CONFIGURATION",
  payload: {
    planConfig: PlanConfig
  }
};

export function removePlanConfig(planConfig: PlanConfig): RemovePlanConfigAction {
  return {
    type: "REMOVE_TARGET_CONFIGURATION",
    payload: {
      planConfig
    }
  };
}
