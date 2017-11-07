"use babel";
// @flow

import { combineReducers } from "redux";
import CacheBlobs from "../ExecutionControlEpic/CacheSystemFeature/Reducers/CacheBlobs";
import DevToolsInfos from "../ExecutionControlEpic/DevToolsSummaryFeature/Reducers/DevToolsInfos";
import Diagnostics from "../ExecutionControlEpic/DiagnosticsFeature/Reducers/Diagnostics";
import Linter from "../ExecutionControlEpic/LinterFeature/Reducers/Linter";
import Packages from "../ProjectSystemEpic/PackageFeature/Reducers/Packages";
import PlanConfigs from "../ExecutionControlEpic/PlanConfigurationFeature/Reducers/PlanConfigs";
import PlanConfigSchemas from "../ExecutionControlEpic/PlanConfigurationFeature/Reducers/PlanConfigSchemas";
import Tasks from "../ExecutionControlEpic/TaskExecutionFeature/Reducers/Tasks";

export default combineReducers({
  cacheBlobs: CacheBlobs,
  devtools: DevToolsInfos,
  diagnostics: Diagnostics,
  linter: Linter,
  packages: Packages,
  planConfigSchemas: PlanConfigSchemas,
  plans: PlanConfigs,
  tasks: Tasks,
});
