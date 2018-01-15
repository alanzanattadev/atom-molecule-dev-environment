"use babel";
// @flow

import type { DevTool } from "../Types/types.js.flow";
import { fromJS } from "immutable";

export default function(
  state: DevToolsInfoReducer = [],
  action: any,
): DevToolsInfoReducer {
  switch (action.type) {
    case "ADD_DEVTOOL":
      return fromJS(state)
        .push(action.payload)
        .toJS();
    default:
      return state;
  }
}

export type DevToolsInfoReducer = Array<DevTool>;
