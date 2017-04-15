"use babel";
// @flow

import type { Package } from "../Types/types.js.flow";
import { fromJS } from "immutable";

export default function Packages(
  state: PackagesReducer = [],
  action: any,
): PackagesReducer {
  switch (action.type) {
    case "PACKAGES_REFRESHED":
      return fromJS(state)
        .filter(p => !p.get("path").startsWith(action.payload.rootPath))
        .concat(fromJS(action).getIn(["payload", "packages"]))
        .toJS();
    default:
      return state;
  }
}

export type PackagesReducer = Array<Package>;
