'use babel'
// @flow

import type {TargetConfig} from "../Types/types.js.flow";
import type {TargetConfigsReducer} from "../Reducers/TargetConfigs";

export function selectTargetsOfTool(state: TargetConfigsReducer, toolId: string): Array<TargetConfig> {
  return state.filter(target => target.tool.id == toolId);
};

export function selectPinnedTargets(state: TargetConfigsReducer): Array<TargetConfig> {
  return state.filter(target => target.pinned);
};
