"use babel";
// @flow
import type {
  PackageInfos
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import path from "path";
import { exec } from "child_process";

export type RemoveBranchAction = (dispatch: (action: any) => void) => void;

export function removeBranch(
  branch: string,
  packageInfos: PackageInfos
): RemoveBranchAction {
  return dispatch => {
    let child = exec(
      `git branch -d ${branch}`,
      { cwd: path.dirname(packageInfos.path) },
      (err, stdout, stderr) => {
        if (err) {
          atom.notifications.addError(`Impossible to remove branch ${branch}`, {
            detail: stderr.toString() + "\n" + err.toString()
          });
        } else {
          atom.notifications.addSuccess(`Remove branch ${branch}`, {
            detail: stdout
          });
        }
      }
    );
  };
}
