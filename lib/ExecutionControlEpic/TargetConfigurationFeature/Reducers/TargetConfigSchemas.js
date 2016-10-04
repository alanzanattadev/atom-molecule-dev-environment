'use babel'
// @flow

import type {DevToolTargetConfigSchema} from "../Types/types.js.flow";
import { fromJS } from "immutable";

export default function (state: TargetConfigSchemasReducer = [], action: any): TargetConfigSchemasReducer {
  switch(action.type) {
    case "ADD_TARGET_CONFIGURATION_SCHEMA":
      return fromJS(state).push(Object.assign({}, action.payload.schema, {tool: action.payload.tool})).toJS();
    default:
      return state;
  }
}

export type TargetConfigSchemasReducer = Array<DevToolTargetConfigSchema>;
