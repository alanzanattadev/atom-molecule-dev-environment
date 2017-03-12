"use babel";
// @flow

export type CheckoutBranchAction = (dispatch: (action: any) => void) => void;
import type {
  PackageInfos
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import { refreshBranches } from "./RefreshBranches";
import { exec } from "child_process";
import path from "path";

export function checkoutBranch(
  branch: string,
  newBranch: boolean = false,
  packageInfos: PackageInfos
): CheckoutBranchAction {
  return dispatch => {
    let child = exec(
      `git checkout ${newBranch ? "-b" : ""} ${branch}`,
      { cwd: path.dirname(packageInfos.path) },
      (err, stdout, stderr) => {
        if (err) {
          atom.notifications.addError("Impossible to checkout", {
            detail: stderr.toString() + "\n" + err.toString()
          });
        } else {
          atom.notifications.addSuccess(`Checkout on ${branch}`, {
            detail: stdout
          });
        }
        dispatch(refreshBranches(packageInfos));
      }
    );
  };
}
