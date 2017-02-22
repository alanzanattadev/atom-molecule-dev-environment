"use babel";
// @flow

import type {
  DevTool
} from "../ExecutionControlEpic/DevToolsSummaryFeature/Types/types.js";
import type {
  DevToolPlanConfigSchema,
  PlanConfig
} from "../ExecutionControlEpic/PlanConfigurationFeature/Types/types.js";
import type { State } from "./types.js.flow";
import type {
  TasksReducer
} from "../ExecutionControlEpic/TaskExecutionFeature/Reducers/Tasks";
import type {
  DiagnosticsReducer
} from "../ExecutionControlEpic/DiagnosticsFeature/Reducers/Diagnostics";
import type {
  CacheBlobsReducer
} from "../ExecutionControlEpic/CacheSystemFeature/Reducers/CacheBlobs";
import type {
  PackagesReducer
} from "../ProjectSystemEpic/PackageFeature/Reducers/Packages";

export function selectDevtoolsReducer(state: State): Array<DevTool> {
  return state.devtools;
}

export function selectPlansReducer(state: State): Array<PlanConfig> {
  return state.plans;
}

export function selectPlansSchemaReducer(
  state: State
): Array<DevToolPlanConfigSchema> {
  return state.planConfigSchemas;
}

export function selectTasksReducer(state: State): TasksReducer {
  return state.tasks;
}

export function selectDiagnosticsReducer(state: State): DiagnosticsReducer {
  return state.diagnostics;
}

export function selectPackagesReducer(state: State): PackagesReducer {
  return state.packages;
}

export function selectCacheBlobsReducer(state: State): CacheBlobsReducer {
  return state.cacheBlobs;
}
