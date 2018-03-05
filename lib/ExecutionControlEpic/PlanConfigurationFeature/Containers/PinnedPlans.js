"use babel";
// @flow

import { connect } from "react-redux";
import Plans from "../Presenters/Plans";
import type { State } from "../../../GlobalSystem/types";
import { selectPinnedPlans } from "../Selectors/PlanConfigs";
import {
  selectPlansReducer,
  selectTasksReducer,
} from "../../../GlobalSystem/Selectors";
import type { PlanConfig } from "../Types/types";
import { unpinPlanConfig } from "../Actions/UnpinPlanConfig";
import { removePlanConfig } from "../Actions/RemovePlanConfig";
import { selectStateOfPlan } from "../../TaskExecutionFeature/Selectors/Tasks";
import { runTask } from "../../TaskExecutionFeature/Actions/RunTask";
import { killTask } from "../../TaskExecutionFeature/Actions/KillTask";
import type { TaskState } from "../../TaskExecutionFeature/Types/types";
import { List } from "immutable";

export function mapStateToProps(state: State): { plans: List<PlanConfig> } {
  return {
    plans: selectPinnedPlans(selectPlansReducer(state)).map(plan => ({
      ...plan,
      state: selectStateOfPlan(selectTasksReducer(state), plan),
    })),
    numberOfPinnedPlans: selectPinnedPlans(selectPlansReducer(state)).size,
  };
}

export function mapDispatchToProps(
  dispatch: (action: any) => any,
  ownProps,
): {
  onPlanUnpin: (plan: PlanConfig, hidePanel: boolean) => void,
  onPlanRemove: (plan: PlanConfig, hidePanel: boolean) => void,
  onPlanClick: (plan: PlanConfig & { state: TaskState }) => void,
} {
  return {
    onPlanUnpin: (plan: PlanConfig, hidePanel: boolean) => {
      dispatch(unpinPlanConfig(plan));
      if (hidePanel) {
        ownProps.hidePinnedPanel();
      }
    },
    onPlanRemove: (plan: PlanConfig, hidePanel: boolean) => {
      dispatch(removePlanConfig(plan));
      if (hidePanel) {
        ownProps.hidePinnedPanel();
      }
    },
    onPlanClick: (plan: PlanConfig & { state: TaskState }) => {
      if (plan.state == "running") {
        dispatch(killTask(plan));
      } else {
        dispatch(runTask(plan));
      }
    },
  };
}

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(Plans);
