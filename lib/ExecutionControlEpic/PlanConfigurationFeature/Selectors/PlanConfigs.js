'use babel'
// @flow

import type {PlanConfig} from "../Types/types.js.flow";
import type {PlanConfigsReducer} from "../Reducers/PlanConfigs";

export function selectPlansOfTool(state: PlanConfigsReducer, toolId: string): Array<PlanConfig> {
  return state.filter(plan => plan.tool.id == toolId);
};

export function selectPinnedPlans(state: PlanConfigsReducer): Array<PlanConfig> {
  return state.filter(plan => plan.pinned);
};
