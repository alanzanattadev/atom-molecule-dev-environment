"use babel";
// @flow

import type { ConfigSchemaPart, DevToolInfo } from "../Types/types";

export type AddPlanConfigSchemaAction = {
  type: "ADD_PLAN_CONFIGURATION_SCHEMA",
  payload: {
    tool: DevToolInfo,
    schema: ConfigSchemaPart,
  },
};

export function addPlanConfigSchema(
  tool: DevToolInfo,
  schema: ConfigSchemaPart,
): AddPlanConfigSchemaAction {
  return {
    type: "ADD_PLAN_CONFIGURATION_SCHEMA",
    payload: {
      schema,
      tool,
    },
  };
}
