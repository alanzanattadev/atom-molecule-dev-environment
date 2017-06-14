"use babel";
// @flow

import type {
  Package,
  Plugin,
  PackagesRefreshedAction,
} from "../Types/types.js.flow";

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
