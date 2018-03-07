"use babel";
// @flow

import type { DevTool } from "../Types/types";
import type { DevToolsInfoReducer } from "../Reducers/DevToolsInfo";
import { Map } from "immutable";

export function selectDevtools(
  devtools: DevToolsInfoReducer,
): Map<string, DevTool> {
  return devtools;
}
