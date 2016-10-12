'use babel'
// @flow

import type {DevToolTargetConfigSchema} from "../Types/types.js.flow";
import type {TargetConfigSchemasReducer} from "../Reducers/TargetConfigSchemas";

export function selectConfigSchemaOfTool(state: TargetConfigSchemasReducer, toolId: string): DevToolTargetConfigSchema {
  // $FlowFixMe
  return state.find(schema => schema.tool.id == toolId);
};
