'use babel'
// @flow

import {combineReducers} from 'redux';
import DevToolsInfos from "../ExecutionControlEpic/DevToolsSummaryFeature/Reducers/DevToolsInfos";
import TargetConfigs from "../ExecutionControlEpic/TargetConfigurationFeature/Reducers/TargetConfigs";
import TargetConfigSchemas from "../ExecutionControlEpic/TargetConfigurationFeature/Reducers/TargetConfigSchemas";
import Tasks from "../ExecutionControlEpic/TaskExecutionFeature/Reducers/Tasks";
import Diagnostics from "../ExecutionControlEpic/DiagnosticsFeature/Reducers/Diagnostics";
import GitIndex from "../VersionningEpic/CommitFeature/Reducers/GitIndex";
import Packages from '../ProjectSystemEpic/PackageFeature/Reducers/Packages';
import Stashes from "../VersionningEpic/StashFeature/Reducers/Stashes";


export default combineReducers({
  devtools: DevToolsInfos,
  targets: TargetConfigs,
  targetConfigSchemas: TargetConfigSchemas,
  tasks: Tasks,
  diagnostics: Diagnostics,
  gitIndex: GitIndex,
  stashes: Stashes,
  packages: Packages,
});
