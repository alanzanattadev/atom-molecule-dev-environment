"use babel";
// @flow

import type { Package, PackagesRefreshedAction, Plugin } from "../Types/types";

export function packagesRefreshed(
  rootPath: string,
  packages: Array<Package>,
  plugins: Array<Plugin>,
): PackagesRefreshedAction {
  return {
    type: "PACKAGES_REFRESHED",
    payload: {
      rootPath,
      packages,
      plugins,
    },
  };
}
