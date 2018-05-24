"use babel";
// @flow

import type { PlanConfigSchemasReducer } from "../ExecutionControlEpic/PlanConfigurationFeature/Reducers/PlanConfigSchemas";
import type { State } from "./types";
import type { TasksReducer } from "../ExecutionControlEpic/TaskExecutionFeature/Reducers/Tasks";
import type { DiagnosticsReducer } from "../ExecutionControlEpic/DiagnosticsFeature/Reducers/Diagnostics";
import type { CacheBlobsReducer } from "../ExecutionControlEpic/CacheSystemFeature/Reducers/CacheBlobs";
import type { PackagesReducer } from "../ProjectSystemEpic/PackageFeature/Reducers/Packages";
import type { DevToolsInfoReducer } from "../ExecutionControlEpic/DevToolsSummaryFeature/Reducers/DevToolsInfo";
import type { PlanConfigsReducer } from "../ExecutionControlEpic/PlanConfigurationFeature/Reducers/PlanConfigs";
import type { ProjectsReducer } from "../EventSystemEpic/ProjectFeature/Types/types";
import type { ConsoleLogsReducer } from "../ExecutionControlEpic/ConsoleFeature/Reducers/ConsoleLogs";
import type { ConsoleSourcesReducer } from "../ExecutionControlEpic/ConsoleFeature/Reducers/ConsoleSources";

export function selectDevtoolsReducer(state: State): DevToolsInfoReducer {
  return state.devtools;
}

export function selectPlansReducer(state: State): PlanConfigsReducer {
  return state.plans;
}

export function selectPlansSchemaReducer(
  state: State,
): PlanConfigSchemasReducer {
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

export function selectProjectsReducer(state: State): ProjectsReducer {
  return state.projects;
}

export function selectConsoleLogsReducer(state: State): ConsoleLogsReducer {
  return state.consolelogs;
}

export function selectConsoleSourcesReducer(
  state: State,
): ConsoleSourcesReducer {
  return state.consolesources;
}
