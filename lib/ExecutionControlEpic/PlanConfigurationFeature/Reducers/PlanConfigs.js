"use babel";
// @flow

import type { PlanConfig } from "../Types/types";
import { Map } from "immutable";

export default function(
  state: PlanConfigsReducer = Map(),
  action: any,
): PlanConfigsReducer {
  switch (action.type) {
    case "ADD_PLAN_CONFIGURATION":
      return state.setIn([action.payload.tool.id, action.payload.id], {
        ...action.payload,
        pinned: false,
      });
    case "PIN_PLAN_CONFIGURATION":
      return state.updateIn(
        [action.payload.planConfig.tool.id, action.payload.planConfig.id],
        (plan = {}) => ({
          ...plan,
          pinned: true,
        }),
      );
    case "UNPIN_PLAN_CONFIGURATION":
      return state.updateIn(
        [action.payload.planConfig.tool.id, action.payload.planConfig.id],
        (plan = {}) => ({
          ...plan,
          pinned: false,
        }),
      );
    case "REMOVE_PLAN_CONFIGURATION":
      return state.deleteIn([
        action.payload.planConfig.tool.id,
        action.payload.planConfig.id,
      ]);
    default:
      return state;
  }
}

export type PlanConfigsReducer = Map<string, Map<string, PlanConfig>>;
