"use babel";
// @flow

import type { DevToolInfo } from "../Types/types.js.flow";

export type RemoveGeneratedPlansAction = {
  type: "REMOVE_GENERATED_PLANS",
  payload: { tool: DevToolInfo, packagePath: string },
};

export function removeGeneratedPlans(
  tool: DevToolInfo,
  packagePath: string,
): RemoveGeneratedPlansAction {
  return {
    type: "REMOVE_GENERATED_PLANS",
    payload: { tool, packagePath },
  };
}
