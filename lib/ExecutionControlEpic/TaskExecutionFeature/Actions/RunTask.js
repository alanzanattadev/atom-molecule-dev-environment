"use babel";
// @flow

import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types";
import type { StagerConfig } from "../../LanguageServerProtocolFeature/Types/stagers";

export type RunTaskAction = {
  type: "RUN_TASK",
  payload: {
    plan: PlanConfig,
    stager: StagerConfig,
  },
};

export function runTask(plan: PlanConfig, stager: StagerConfig): RunTaskAction {
  return {
    type: "RUN_TASK",
    payload: {
      plan,
      stager,
    },
  };
}
