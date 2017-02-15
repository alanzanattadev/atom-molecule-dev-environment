'use babel'
// @flow

import type {PlanConfig} from "../Types/types.js.flow";
import { fromJS, is } from "immutable";

export default function(state: PlanConfigsReducer = [], action: any): PlanConfigsReducer {
  switch(action.type) {
    case "ADD_TARGET_CONFIGURATION":
      return fromJS(state).push({
        name: action.payload.name,
        tool: action.payload.tool,
        config: action.payload.config,
        pinned: false,
        stager: action.payload.stager,
        packageInfos: action.payload.packageInfos,
      }).toJS();
    case "PIN_TARGET_CONFIGURATION":
      return fromJS(state).map(plan => is(plan, fromJS(action.payload.planConfig).remove('state')) ? plan.set('pinned', true) : plan).toJS();
    case "UNPIN_TARGET_CONFIGURATION":
      return fromJS(state).map(plan => is(plan, fromJS(action.payload.planConfig).remove('state')) ? plan.set('pinned', false) : plan).toJS();
    default:
      return state;
  }
}

export type PlanConfigsReducer = Array<PlanConfig>;