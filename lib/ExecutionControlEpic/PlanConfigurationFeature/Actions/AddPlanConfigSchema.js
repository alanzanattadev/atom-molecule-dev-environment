"use babel";
// @flow

import type {ConfigSchemaPart} from "../../../types";
import type {DevToolInfos} from "../Types/types.js.flow";
import type {AddPlanConfigSchemaAction} from "../Types/types";

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
