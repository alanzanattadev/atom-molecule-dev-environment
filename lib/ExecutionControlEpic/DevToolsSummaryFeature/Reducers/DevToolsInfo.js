"use babel";
// @flow

import type { DevTool } from "../Types/types.js.flow";
import { Map } from "immutable";

export default function(
  state: DevToolsInfoReducer = Map(),
  action: any,
): DevToolsInfoReducer {
  switch (action.type) {
    case "ADD_DEVTOOL":
      return state.set(action.payload.id, action.payload);
    default:
      return state;
  }
}

export type DevToolsInfoReducer = Map<string, DevTool>;
