"use babel";
// @flow

import type { DevTool } from "../Types/types.js.flow";
import type { DevToolsInfoReducer } from "../Reducers/DevToolsInfo";

export function selectDevtools(devtools: DevToolsInfoReducer): Array<DevTool> {
  return devtools;
}
