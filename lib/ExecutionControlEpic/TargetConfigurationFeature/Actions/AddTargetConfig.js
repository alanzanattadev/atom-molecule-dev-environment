'use babel'
// @flow

import type {DevToolInfos, Stager} from "../Types/types.js.flow";
import type {PackageInfos} from '../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow';

export type AddTargetConfigAction = {
  type: "ADD_TARGET_CONFIGURATION",
  payload: {
    name: string,
    tool: DevToolInfos,
    config: mixed,
    stager: Stager,
    packageInfos: PackageInfos,
  }
};

export function addTargetConfig(name: string, toolInfos: DevToolInfos, config: mixed, stager: Stager, packageInfos: PackageInfos): AddTargetConfigAction {
  return {
    type: "ADD_TARGET_CONFIGURATION",
    payload: {
      name,
      tool: toolInfos,
      config,
      stager,
      packageInfos,
    }
  };
};
