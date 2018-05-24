"use babel";
// @flow

import { combineReducers } from "redux";
import DevToolsInfo from "../ExecutionControlEpic/DevToolsSummaryFeature/Reducers/DevToolsInfo";
import PlanConfigs from "../ExecutionControlEpic/PlanConfigurationFeature/Reducers/PlanConfigs";
import PlanConfigSchemas from "../ExecutionControlEpic/PlanConfigurationFeature/Reducers/PlanConfigSchemas";
import Tasks from "../ExecutionControlEpic/TaskExecutionFeature/Reducers/Tasks";
import Diagnostics from "../ExecutionControlEpic/DiagnosticsFeature/Reducers/Diagnostics";
import Packages from "../ProjectSystemEpic/PackageFeature/Reducers/Packages";
import LoadingProgress from "../ExecutionControlEpic/LoadingProgressFeature/Reducers/LoadingProgress";
import Projects from "../EventSystemEpic/ProjectFeature/Reducers/Projects";
import CacheBlobs from "../ExecutionControlEpic/CacheSystemFeature/Reducers/CacheBlobs";
import ConsoleLogs from "../ExecutionControlEpic/ConsoleFeature/Reducers/ConsoleLogs";
import ConsoleSources from "../ExecutionControlEpic/ConsoleFeature/Reducers/ConsoleSources";

export default combineReducers({
  devtools: DevToolsInfo,
  plans: PlanConfigs,
  planConfigSchemas: PlanConfigSchemas,
  tasks: Tasks,
  diagnostics: Diagnostics,
  packages: Packages,
  loadingProgress: LoadingProgress,
  cacheBlobs: CacheBlobs,
  projects: Projects,
  consolelogs: ConsoleLogs,
  consolesources: ConsoleSources,
});
