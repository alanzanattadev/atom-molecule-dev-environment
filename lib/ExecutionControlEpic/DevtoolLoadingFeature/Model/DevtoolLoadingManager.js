"use babel";
// @flow

import path from "path";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import type { ProvidedDevTool } from "../Types/types.js.flow";

export function requireDevtool(plan: PlanConfig): ?ProvidedDevTool {
  return require(plan.tool.uri);
}
