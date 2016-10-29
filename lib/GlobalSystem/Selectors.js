'use babel'
// @flow

import type {DevTool} from "../ExecutionControlEpic/DevToolsSummaryFeature/Types/types.js";
import type {DevToolTargetConfigSchema, TargetConfig} from "../ExecutionControlEpic/TargetConfigurationFeature/Types/types.js";
import type {State} from "./types.js.flow";
import type {TasksReducer} from "../ExecutionControlEpic/TaskExecutionFeature/Reducers/Tasks";
import type {DiagnosticsReducer} from "../ExecutionControlEpic/DiagnosticsFeature/Reducers/Diagnostics";

export function selectDevtoolsReducer(state: State): Array<DevTool> {
  return state.devtools;
}

export function selectTargetsReducer(state: State): Array<TargetConfig> {
  return state.targets;
};

export function selectTargetsSchemaReducer(state: State): Array<DevToolTargetConfigSchema> {
  return state.targetConfigSchemas;
};

export function selectTasksReducer(state: State): TasksReducer {
  return state.tasks;
};

export function selectDiagnosticsReducer(state: State): DiagnosticsReducer {
  return state.diagnostics;
};
