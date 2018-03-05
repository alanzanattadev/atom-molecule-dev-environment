"use babel";
// @flow

export type RemovePackagesAction = {
  type: "REMOVE_PACKAGES",
  payload: {
    rootPath: string,
  },
};

export function removePackages(rootPath: string): RemovePackagesAction {
  return {
    type: "REMOVE_PACKAGES",
    payload: {
      rootPath,
    },
  };
}
