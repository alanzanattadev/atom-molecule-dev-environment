"use babel";
// @flow

import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types";
import type { ProvidedDevTool } from "../Types/types";

export function requireDevtool(plan: PlanConfig): ?ProvidedDevTool {
  return require(plan.tool.uri);
}
