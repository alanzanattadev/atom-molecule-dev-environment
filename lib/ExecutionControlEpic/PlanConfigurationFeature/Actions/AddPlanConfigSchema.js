"use babel";
// @flow

import type { ConfigSchemaPart, DevToolInfos } from "../Types/types";

export type AddPlanConfigSchemaAction = {
  type: "ADD_PLAN_CONFIGURATION_SCHEMA",
  payload: {
    tool: DevToolInfos,
    schema: ConfigSchemaPart,
  },
};

export function addPlanConfigSchema(
  tool: DevToolInfos,
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
