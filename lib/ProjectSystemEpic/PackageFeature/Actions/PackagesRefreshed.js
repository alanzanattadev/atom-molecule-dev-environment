"use babel";
// @flow

import type {Package} from "../Types/types.js";

export type PackagesRefreshedAction = {
  type: "PACKAGES_REFRESHED",
  payload: {
    rootPath: string,
    packages: Array<Package>,
  },
};
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
