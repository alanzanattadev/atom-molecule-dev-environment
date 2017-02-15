'use babel'
// @flow

import { fromJS } from "immutable";
import type {PlanConfig} from "../Types/types.js";


export type PinPlanConfigAction = {
  type: "PIN_TARGET_CONFIGURATION",
  payload: {
    planConfig: PlanConfig
  }
};

export function pinPlanConfig(planConfig: PlanConfig): PinPlanConfigAction {
  return {
    type: "PIN_TARGET_CONFIGURATION",
    payload: {
      planConfig
    }
  };
};
