"use babel";
// @flow

import { connect } from "react-redux";
import Plans from "../Presenters/Plans";
import type { State } from "../../../GlobalSystem/types.js.flow";
import { selectPinnedPlans } from "../Selectors/PlanConfigs";
import {
  selectPlansReducer,
  selectTasksReducer
} from "../../../GlobalSystem/Selectors";
import type { PlanConfig } from "../Types/types.js";
import { selectStateOfPlan } from "../../TaskExecutionFeature/Selectors/Tasks";
import { fromJS } from "immutable";
import { runTask } from "../../TaskExecutionFeature/Actions/RunTask";
import { killTask } from "../../TaskExecutionFeature/Actions/KillTask";
import type { TaskState } from "../../TaskExecutionFeature/Types/types.js.flow";

export function mapStateToProps(state: State): { plans: Array<PlanConfig> } {
  return {
    plans: selectPinnedPlans(selectPlansReducer(state)).map(plan =>
      fromJS(plan)
        .set("state", selectStateOfPlan(selectTasksReducer(state), plan))
        .toJS())
  };
}

export function mapDispatchToProps(dispatch: (action: any) => any): {} {
  return {
    onPlanClick: (plan: PlanConfig & { state: TaskState }) => {
      if (plan.state == "running") {
        dispatch(killTask(plan));
      } else {
        dispatch(runTask(plan));
      }
    }
  };
}

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(Plans);
