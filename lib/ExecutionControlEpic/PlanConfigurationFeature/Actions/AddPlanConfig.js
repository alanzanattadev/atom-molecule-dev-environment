"use babel";
// @flow

import type { PlanConfig } from "../Types/types";

export type AddPlanConfigAction = {
  type: "ADD_PLAN_CONFIGURATION",
  payload: PlanConfig,
};

export type AddPlanConfigIfNotExistAction = {
  type: "ADD_PLAN_CONFIGURATION_IF_NOT_EXIST",
  payload: PlanConfig,
};

export function addPlanConfig(config: PlanConfig): AddPlanConfigAction {
  return {
    type: "ADD_PLAN_CONFIGURATION",
    payload: config,
  };
}

export function addPlanConfigIfNotExist(
  config: PlanConfig,
): AddPlanConfigIfNotExistAction {
  return {
    type: "ADD_PLAN_CONFIGURATION_IF_NOT_EXIST",
    payload: config,
  };
}
