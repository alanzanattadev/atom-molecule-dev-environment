"use babel";
// @flow

import type { PackageRefreshCompletedAction } from "../Types/types";

export function packageRefreshCompleted(
  rootPath: string,
  actionCount: number,
): PackageRefreshCompletedAction {
  return {
    type: "PACKAGE_REFRESH_COMPLETED",
    payload: {
      rootPath,
      actionCount,
    },
  };
}
