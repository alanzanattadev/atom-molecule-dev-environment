"use babel";
// @flow

import { connect } from "react-redux";
import Plans from "../Presenters/Plans";
import type { State } from "../../../GlobalSystem/types";
import {
  selectPlansReducer,
  selectTasksReducer,
} from "../../../GlobalSystem/Selectors";
import { selectPinnedPlans, selectPlansOfTool } from "../Selectors/PlanConfigs";
import { pinPlanConfig } from "../Actions/PinPlanConfig";
import { removePlanConfig } from "../Actions/RemovePlanConfig";
import type { PlanConfig } from "../Types/types";
import { selectStateOfPlan } from "../../TaskExecutionFeature/Selectors/Tasks";
import type { TaskState } from "../../TaskExecutionFeature/Types/types";
import { runTask } from "../../TaskExecutionFeature/Actions/RunTask";
import { killTask } from "../../TaskExecutionFeature/Actions/KillTask";
import { List } from "immutable";

export function mapStateToProps(
  state: State,
  { toolId }: { toolId: string },
): {
  plans: List<PlanConfig & { state: TaskState }>,
  numberOfPinnedPlans: number,
} {
  return {
    plans: selectPlansOfTool(selectPlansReducer(state), toolId).map(plan => ({
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
  onPlanPin: (plan: PlanConfig) => void,
  onPlanRemove: (plan: PlanConfig, hidePanel: boolean) => void,
  onPlanClick: (plan: PlanConfig & { state: TaskState }) => void,
} {
  return {
    onPlanPin: (plan: PlanConfig) => {
      dispatch(pinPlanConfig(plan));
      ownProps.onPinned();
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
        dispatch(runTask(plan, { type: "local" }));
      }
    },
  };
}

export var Connecter = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default Connecter(Plans);
