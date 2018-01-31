"use babel";
// @flow

import type { Package } from "../Types/types.js.flow";
import { Map, List } from "immutable";

export default function Packages(
  state: PackagesReducer = Map(),
  action: any,
): PackagesReducer {
  switch (action.type) {
    case "PACKAGES_REFRESHED":
      return action.payload.packages.reduce(
        (newState, pkg) =>
          newState.update(pkg.plugin.tool.id, (list = List()) =>
            list.push(pkg),
          ),
        state.map(
          (packages, toolId) =>
            action.payload.plugins.find(plugin => plugin.tool.id == toolId)
              ? packages.filter(
                  pkg => !pkg.path.startsWith(action.payload.rootPath),
                )
              : packages,
        ),
      );
    default:
      return state;
  }
}

export type PackagesReducer = Map<string, List<Package>>;
