"use babel";
// @flow

import {combineReducers} from "redux";
import DevToolsInfos from "../ExecutionControlEpic/DevToolsSummaryFeature/Reducers/DevToolsInfos";
import PlanConfigs from "../ExecutionControlEpic/PlanConfigurationFeature/Reducers/PlanConfigs";
import PlanConfigSchemas from "../ExecutionControlEpic/PlanConfigurationFeature/Reducers/PlanConfigSchemas";
import Tasks from "../ExecutionControlEpic/TaskExecutionFeature/Reducers/Tasks";
import Diagnostics from "../ExecutionControlEpic/DiagnosticsFeature/Reducers/Diagnostics";
import GitIndex from "../VersionningEpic/CommitFeature/Reducers/GitIndex";
import Packages from "../ProjectSystemEpic/PackageFeature/Reducers/Packages";
import Stashes from "../VersionningEpic/StashFeature/Reducers/Stashes";
import Remotes from "../VersionningEpic/BranchFeature/Reducers/Remotes";
import Branches from "../VersionningEpic/BranchFeature/Reducers/Branches";
import CacheBlobs from "../ExecutionControlEpic/CacheSystemFeature/Reducers/CacheBlobs";

export default combineReducers({
  devtools: DevToolsInfos,
  plans: PlanConfigs,
  planConfigSchemas: PlanConfigSchemas,
  tasks: Tasks,
  diagnostics: Diagnostics,
  gitIndex: GitIndex,
  stashes: Stashes,
  packages: Packages,
  remotes: Remotes,
  branches: Branches,
  cacheBlobs: CacheBlobs,
});
