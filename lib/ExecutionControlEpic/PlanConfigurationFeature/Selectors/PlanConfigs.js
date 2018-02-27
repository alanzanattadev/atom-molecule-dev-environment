"use babel";
// @flow

import type { PlanConfig } from "../Types/types.js.flow";
import type { PlanConfigsReducer } from "../Reducers/PlanConfigs";
import { List } from "immutable";

export function selectPlansOfTool(
  state: PlanConfigsReducer,
  toolId: string,
): List<PlanConfig> {
  return state.get(toolId) ? state.get(toolId).toList() : List();
}

export function selectPinnedPlans(state: PlanConfigsReducer): List<PlanConfig> {
  return state.valueSeq().reduce((pinnedPlans, idMappedPlan) => {
    return pinnedPlans.concat(
      idMappedPlan.valueSeq().filter(plan => plan.pinned),
    );
  }, List());
}
