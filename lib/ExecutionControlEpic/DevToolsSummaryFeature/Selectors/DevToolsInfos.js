"use babel";
// @flow

import type { DevTool } from "../Types/types.js.flow";
import type { DevToolsInfosReducer } from "../Reducers/DevToolsInfos";

export function selectDevtools(devtools: DevToolsInfosReducer): Array<DevTool> {
  return devtools;
}
