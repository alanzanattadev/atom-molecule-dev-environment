'use babel'
// @flow

import type {ConfigSchemaPart} from "../../../types";
import type {DevToolInfos} from "../Types/types.js.flow";

export type AddTargetConfigSchemaAction = {
  type: "ADD_TARGET_CONFIGURATION_SCHEMA",
  payload: {
    tool: DevToolInfos,
    schema: ConfigSchemaPart,
  }
};

export function addTargetConfigSchema(tool: DevToolInfos, schema: ConfigSchemaPart): AddTargetConfigSchemaAction {
  return {
    type: "ADD_TARGET_CONFIGURATION_SCHEMA",
    payload: {
      schema,
      tool,
    }
  };
};
