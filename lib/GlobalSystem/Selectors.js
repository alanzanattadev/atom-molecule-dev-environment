'use babel'
// @flow

import type {DevTool} from "../ExecutionControlEpic/DevToolsSummaryFeature/Types/types.js";
import type {DevToolTargetConfigSchema, TargetConfig} from "../ExecutionControlEpic/TargetConfigurationFeature/Types/types.js";
import type {State} from "./types.js.flow";

export function selectDevtoolsReducer(state: State): Array<DevTool> {
  return state.devtools;
}

export function selectTargetsReducer(state: State): Array<TargetConfig> {
  return state.targets;
};

export function selectTargetsSchemaReducer(state: State): Array<DevToolTargetConfigSchema> {
  return state.targetConfigSchemas;
};
