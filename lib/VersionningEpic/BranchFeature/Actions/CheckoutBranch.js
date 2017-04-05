"use babel";
// @flow

import type {CheckoutBranchAction} from "../Types/types";
import type {PackageInfos} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import {refreshBranches} from "./RefreshBranches";
import {exec} from "child_process";
import path from "path";
import notifications from "atom";

export function checkoutBranch(
  branch: string,
  newBranch: boolean = false,
  packageInfos: PackageInfos,
): CheckoutBranchAction {
  return dispatch => {
    let child = exec(
      `git checkout ${newBranch ? "-b" : ""} ${branch}`,
      { cwd: path.dirname(packageInfos.path) },
      (err, stdout, stderr) => {
        if (err) {
          notifications.addError("Impossible to checkout", {
            detail: stderr.toString() + "\n" + err.toString(),
          });
        } else {
          notifications.addSuccess(`Checkout on ${branch}`, {
            detail: stdout,
          });
        }
        dispatch(refreshBranches(packageInfos));
      },
    );
  };
}
