"use babel";
// @flow

import type { CheckoutBranchAction } from "../Types/types";
import type {
  PackageInfos,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import { refreshBranches } from "./RefreshBranches";
import { exec } from "child_process";
import path from "path";

export function checkoutBranch(
  branch: string,
  newBranch: boolean = false,
  packageInfos: PackageInfos,
): CheckoutBranchAction {
  return dispatch => {
    exec(
      `git checkout ${newBranch ? "-b" : ""} ${branch}`,
      { cwd: path.dirname(packageInfos.path) },
      (err, stdout, stderr) => {
        if (err) {
          global.atom.notifications.addError("Impossible to checkout", {
            detail: stderr.toString() + "\n" + err.toString(),
          });
        } else {
          global.atom.notifications.addSuccess(`Checkout on ${branch}`, {
            detail: stdout,
          });
        }
        dispatch(refreshBranches(packageInfos));
      },
    );
  };
}
