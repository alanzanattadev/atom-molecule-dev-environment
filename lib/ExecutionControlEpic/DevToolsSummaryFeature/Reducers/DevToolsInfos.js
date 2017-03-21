"use babel";
// @flow

import type {DevTool} from "../Types/types.js.flow";
import {fromJS} from "immutable";

export default function(
  state: DevToolsInfosReducer = [],
  action: any,
): DevToolsInfosReducer {
  switch (action.type) {
    case "ADD_DEVTOOL":
      return fromJS(state).push(action.payload).toJS();
    default:
      return state;
  }
}

export type DevToolsInfosReducer = Array<DevTool>;
