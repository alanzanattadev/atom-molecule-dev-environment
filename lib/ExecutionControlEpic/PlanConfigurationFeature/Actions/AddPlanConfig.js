"use babel";
// @flow

import type { DevToolInfo } from "../Types/types";
import type { PackageInfo } from "../../../ProjectSystemEpic/PackageFeature/Types/types";

export type AddPlanConfigAction = {
  type: "ADD_PLAN_CONFIGURATION",
  payload: {
    id: string,
    name: string,
    tool: DevToolInfo,
    config: mixed,
    packageInfo: PackageInfo,
  },
};

export function addPlanConfig(
  id: string,
  name: string,
  toolInfo: DevToolInfo,
  config: mixed,
  packageInfo: PackageInfo,
): AddPlanConfigAction {
  return {
    type: "ADD_PLAN_CONFIGURATION",
    payload: {
      id,
      name,
      tool: toolInfo,
      config,
      packageInfo,
    },
  };
}
