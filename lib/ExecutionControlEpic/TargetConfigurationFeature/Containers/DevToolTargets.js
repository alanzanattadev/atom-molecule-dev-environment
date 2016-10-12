'use babel'
// @flow

import { connect } from "react-redux";
import Targets from "../Presenters/Targets";
import type {State} from "../../../GlobalSystem/types.js.flow";
import {selectTargetsReducer, selectTasksReducer} from "../../../GlobalSystem/Selectors";
import {selectTargetsOfTool} from "../Selectors/TargetConfigs";
import {pinTargetConfig} from "../Actions/PinTargetConfig";
import type {TargetConfig} from "../Types/types.js.flow";
import {selectStateOfTarget} from "../../TaskExecutionFeature/Selectors/Tasks";
import { fromJS } from "immutable";
import type {TaskState} from "../../TaskExecutionFeature/Types/types.js.flow";
import {runTask} from "../../TaskExecutionFeature/Actions/RunTask";
import {killTask} from "../../TaskExecutionFeature/Actions/KillTask";
import moment from 'moment';

export function mapStateToProps(state: State, {toolId}: {toolId: string}): {targets: Array<TargetConfig & {state: TaskState}>} {
  return {
    targets: selectTargetsOfTool(selectTargetsReducer(state), toolId).map(target => fromJS(target).set('state', selectStateOfTarget(selectTasksReducer(state), {config: target.config, tool: target.tool})).toJS())
  };
};

export function mapDispatchToProps(dispatch: (action: any) => any): {onTargetPin: (target: TargetConfig) => void, onTargetClick: (target: TargetConfig) => void} {
  return {
    onTargetPin: (target: TargetConfig) => {
      dispatch(pinTargetConfig(target));
    },
    onTargetClick: (target: TargetConfig & {state: TaskState}) => {
      if (target.state == 'running') {
        dispatch(killTask(target));
      } else {
        dispatch(runTask(target));
      }
    },
  };
};

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(Targets);
