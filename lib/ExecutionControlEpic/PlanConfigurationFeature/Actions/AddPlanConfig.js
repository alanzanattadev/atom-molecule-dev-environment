"use babel";
// @flow

import type { DevToolInfo, Stager } from "../Types/types.js.flow";
import type { PackageInfo } from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";

export type AddPlanConfigAction = {
  type: "ADD_PLAN_CONFIGURATION",
  payload: {
    id: string,
    name: string,
    tool: DevToolInfo,
    config: mixed,
    stager: Stager,
    packageInfo: PackageInfo,
  },
};

export function addPlanConfig(
  id: string,
  name: string,
  toolInfo: DevToolInfo,
  config: mixed,
  stager: Stager,
  packageInfo: PackageInfo,
): AddPlanConfigAction {
  return {
    type: "ADD_PLAN_CONFIGURATION",
    payload: {
      id,
      name,
      tool: toolInfo,
      config,
      stager,
      packageInfo,
    },
  };
}
