"use babel";
// @flow

import type {DevToolPlanConfigSchema} from "../Types/types.js.flow";
import {fromJS} from "immutable";

export default function(
  state: PlanConfigSchemasReducer = [],
  action: any,
): PlanConfigSchemasReducer {
  switch (action.type) {
    case "ADD_PLAN_CONFIGURATION_SCHEMA":
      return fromJS(state)
        .push(
          Object.assign({}, action.payload.schema, {
            tool: action.payload.tool,
          }),
        )
        .toJS();
    default:
      return state;
  }
}

export type PlanConfigSchemasReducer = Array<DevToolPlanConfigSchema>;
