'use babel'
// @flow

import {combineReducers} from 'redux';
import DevToolsInfos from "../ExecutionControlEpic/DevToolsSummaryFeature/Reducers/DevToolsInfos";
import TargetConfigs from "../ExecutionControlEpic/TargetConfigurationFeature/Reducers/TargetConfigs";
import TargetConfigSchemas from "../ExecutionControlEpic/TargetConfigurationFeature/Reducers/TargetConfigSchemas";


export default combineReducers({
  devtools: DevToolsInfos,
  targets: TargetConfigs,
  targetConfigSchemas: TargetConfigSchemas
});
