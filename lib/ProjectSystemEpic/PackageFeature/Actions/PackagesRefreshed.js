"use babel";
// @flow

import type {Package, PackagesRefreshedAction} from "../Types/types.js";

export function packagesRefreshed(
  rootPath: string,
  packages: Array<Package>,
): PackagesRefreshedAction {
  return {
    type: "PACKAGES_REFRESHED",
    payload: {
      rootPath,
      packages,
    },
  };
}
