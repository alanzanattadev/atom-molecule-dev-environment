'use babel'
// @flow

import type {DevToolInfos} from "../Types/types.js.flow";

export type AddTargetConfigAction = {
  type: "ADD_TARGET_CONFIGURATION",
  payload: {
    name: string,
    tool: DevToolInfos,
    config: mixed
  }
};

export function addTargetConfig(name: string, toolInfos: DevToolInfos, config: mixed): AddTargetConfigAction {
  return {
    type: "ADD_TARGET_CONFIGURATION",
    payload: {
      name,
      tool: toolInfos,
      config
    }
  };
};
