"use babel";
// @flow

import type { Package } from "../Types/types";
import { List, Map } from "immutable";

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
        state.map((packages, toolId) =>
          action.payload.plugins.find(plugin => plugin.tool.id == toolId)
            ? packages.filter(
                pkg => !pkg.path.startsWith(action.payload.rootPath),
              )
            : packages,
        ),
      );
    case "REMOVE_PACKAGES":
      return state
        .map(packages =>
          packages.filter(pkg => !pkg.path.startsWith(action.payload.rootPath)),
        )
        .filter(packages => packages.size > 0);
    default:
      return state;
  }
}

export type PackagesReducer = Map<string, List<Package>>;
