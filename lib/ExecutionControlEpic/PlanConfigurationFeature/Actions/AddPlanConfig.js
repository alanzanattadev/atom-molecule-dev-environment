"use babel";
// @flow

import type {DevToolInfos, Stager} from "../Types/types.js.flow";
import type {PackageInfos} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";

export type AddPlanConfigAction = {
  type: "ADD_PLAN_CONFIGURATION",
  payload: {
    name: string,
    tool: DevToolInfos,
    config: mixed,
    stager: Stager,
    packageInfos: PackageInfos,
  },
};

export function addPlanConfig(
  name: string,
  toolInfos: DevToolInfos,
  config: mixed,
  stager: Stager,
  packageInfos: PackageInfos,
): AddPlanConfigAction {
  return {
    type: "ADD_PLAN_CONFIGURATION",
    payload: {
      name,
      tool: toolInfos,
      config,
      stager,
      packageInfos,
    },
  };
}
