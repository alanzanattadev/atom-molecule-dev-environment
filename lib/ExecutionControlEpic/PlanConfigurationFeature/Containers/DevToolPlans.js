'use babel'
// @flow

import { connect } from "react-redux";
import Plans from "../Presenters/Plans";
import type {State} from "../../../GlobalSystem/types.js.flow";
import {selectPlansReducer, selectTasksReducer} from "../../../GlobalSystem/Selectors";
import {selectPlansOfTool} from "../Selectors/PlanConfigs";
import {pinPlanConfig} from "../Actions/PinPlanConfig";
import type {PlanConfig} from "../Types/types.js.flow";
import {selectStateOfPlan} from "../../TaskExecutionFeature/Selectors/Tasks";
import { fromJS } from "immutable";
import type {TaskState} from "../../TaskExecutionFeature/Types/types.js.flow";
import {runTask} from "../../TaskExecutionFeature/Actions/RunTask";
import {killTask} from "../../TaskExecutionFeature/Actions/KillTask";
import moment from 'moment';

export function mapStateToProps(state: State, {toolId}: {toolId: string}): {plans: Array<PlanConfig & {state: TaskState}>} {
  return {
    plans: selectPlansOfTool(selectPlansReducer(state), toolId).map(plan => fromJS(plan).set('state', selectStateOfPlan(selectTasksReducer(state), plan)).toJS())
  };
};

export function mapDispatchToProps(dispatch: (action: any) => any, ownProps): {onPlanPin: (plan: PlanConfig) => void, onPlanClick: (plan: PlanConfig) => void} {
  return {
    onPlanPin: (plan: PlanConfig) => {
      dispatch(pinPlanConfig(plan));
      ownProps.onPinned();
    },
    onPlanClick: (plan: PlanConfig & {state: TaskState}) => {
      if (plan.state == 'running') {
        dispatch(killTask(plan));
      } else {
        dispatch(runTask(plan));
      }
    },
  };
};

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(Plans);
