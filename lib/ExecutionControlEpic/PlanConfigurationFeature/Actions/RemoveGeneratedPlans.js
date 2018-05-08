"use babel";
// @flow

import type { DevToolInfo } from "../Types/types.js.flow";

export type RemoveGeneratedPlansAction = {
  type: "REMOVE_GENERATED_PLANS",
  payload: { tool: DevToolInfo },
};

export function removeGeneratedPlans(
  tool: DevToolInfo,
): RemoveGeneratedPlansAction {
  return {
    type: "REMOVE_GENERATED_PLANS",
    payload: { tool },
  };
}
