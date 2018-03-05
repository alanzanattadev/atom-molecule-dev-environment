"use babel";
// @flow

import type { PackagesReducer } from "../Reducers/Packages";
import type { Package } from "../Types/types";
import { List } from "immutable";

export function selectPackagesOfTool(
  state: PackagesReducer,
  toolId: string,
): List<Package> {
  return state.has(toolId) ? state.get(toolId) : List();
}
