"use babel";
// @flow

import { combineReducers } from "redux";
import DevToolsInfo from "../ExecutionControlEpic/DevToolsSummaryFeature/Reducers/DevToolsInfo";
import PlanConfigs from "../ExecutionControlEpic/PlanConfigurationFeature/Reducers/PlanConfigs";
import PlanConfigSchemas from "../ExecutionControlEpic/PlanConfigurationFeature/Reducers/PlanConfigSchemas";
import Tasks from "../ExecutionControlEpic/TaskExecutionFeature/Reducers/Tasks";
import Diagnostics from "../ExecutionControlEpic/DiagnosticsFeature/Reducers/Diagnostics";
import Packages from "../ProjectSystemEpic/PackageFeature/Reducers/Packages";
import CacheBlobs from "../ExecutionControlEpic/CacheSystemFeature/Reducers/CacheBlobs";

export default combineReducers({
  devtools: DevToolsInfo,
  plans: PlanConfigs,
  planConfigSchemas: PlanConfigSchemas,
  tasks: Tasks,
  diagnostics: Diagnostics,
  packages: Packages,
  cacheBlobs: CacheBlobs,
});
