"use babel";
// @flow

import type { DevToolPlanConfigSchema } from "../Types/types";
import { Map } from "immutable";

export default function(
  state: PlanConfigSchemasReducer = Map(),
  action: any,
): PlanConfigSchemasReducer {
  switch (action.type) {
    case "ADD_PLAN_CONFIGURATION_SCHEMA":
      return state.setIn([action.payload.tool.id], {
        ...action.payload.schema,
        tool: action.payload.tool,
      });
    default:
      return state;
  }
}

export type PlanConfigSchemasReducer = Map<string, DevToolPlanConfigSchema>;
