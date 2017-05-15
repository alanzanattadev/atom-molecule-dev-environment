"use babel";
// @flow

import type { DevTool } from "../Types/types.js.flow";

export type AddDevToolAction = {
  type: "ADD_DEVTOOL",
  payload: DevTool,
};

export function addDevTool(devtool: DevTool): AddDevToolAction {
  return {
    type: "ADD_DEVTOOL",
    payload: devtool,
  };
}
