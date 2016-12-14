'use babel'
// @flow

import type {TargetConfig} from "../Types/types.js.flow";
import { fromJS, is } from "immutable";

export default function(state: TargetConfigsReducer = [], action: any): TargetConfigsReducer {
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
      return fromJS(state).map(target => is(target, fromJS(action.payload.targetConfig).remove('state')) ? target.set('pinned', true) : target).toJS();
    case "UNPIN_TARGET_CONFIGURATION":
      return fromJS(state).map(target => is(target, fromJS(action.payload.targetConfig).remove('state')) ? target.set('pinned', false) : target).toJS();
    default:
      return state;
  }
}

export type TargetConfigsReducer = Array<TargetConfig>;
