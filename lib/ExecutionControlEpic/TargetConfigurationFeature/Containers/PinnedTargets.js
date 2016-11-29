'use babel'
// @flow

import { connect } from "react-redux";
import Targets from "../Presenters/Targets";
import type {State} from "../../../GlobalSystem/types.js.flow";
import {selectPinnedTargets} from "../Selectors/TargetConfigs";
import {selectTargetsReducer, selectTasksReducer} from "../../../GlobalSystem/Selectors";
import type {TargetConfig} from "../Types/types.js";
import {selectStateOfTarget} from "../../TaskExecutionFeature/Selectors/Tasks";
import { fromJS } from "immutable";
import {runTask} from "../../TaskExecutionFeature/Actions/RunTask";
import {killTask} from "../../TaskExecutionFeature/Actions/KillTask";
import type {TaskState} from "../../TaskExecutionFeature/Types/types.js.flow";

export function mapStateToProps(state: State): {targets: Array<TargetConfig>} {
  return {
    targets: selectPinnedTargets(selectTargetsReducer(state)).map(target => fromJS(target).set('state', selectStateOfTarget(selectTasksReducer(state), target)).toJS())
  };
};

export function mapDispatchToProps(dispatch: (action: any) => any): {} {
  return {
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
