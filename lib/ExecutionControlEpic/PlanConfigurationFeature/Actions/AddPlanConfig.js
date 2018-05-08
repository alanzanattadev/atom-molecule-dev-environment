"use babel";
// @flow

import type { PlanConfig } from "../Types/types";

export type AddPlanConfigAction = {
  type: "ADD_PLAN_CONFIGURATION",
  payload: PlanConfig,
};

export function addPlanConfig(config: PlanConfig): AddPlanConfigAction {
  return {
    type: "ADD_PLAN_CONFIGURATION",
    payload: config,
  };
}
