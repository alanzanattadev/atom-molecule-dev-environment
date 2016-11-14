'use babel'
// @flow

import type {DevToolInfos, Stager} from "../Types/types.js.flow";

export type AddTargetConfigAction = {
  type: "ADD_TARGET_CONFIGURATION",
  payload: {
    name: string,
    tool: DevToolInfos,
    config: mixed,
    stager: Stager,
  }
};

export function addTargetConfig(name: string, toolInfos: DevToolInfos, config: mixed, stager: Stager): AddTargetConfigAction {
  return {
    type: "ADD_TARGET_CONFIGURATION",
    payload: {
      name,
      tool: toolInfos,
      config,
      stager,
    }
  };
};
