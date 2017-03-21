"use babel";
// @flow

import type {PackageInfos} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import path from "path";
import {exec} from "child_process";

export type PullBranchAction = (dispatch: (action: any) => void) => void;

export function pullBranch(
  remote: string,
  branch: string,
  packageInfos: PackageInfos,
): PullBranchAction {
  return dispatch => {
    let child = exec(
      `git pull ${remote} ${branch}`,
      { cwd: path.dirname(packageInfos.path) },
      (err, stdout, stderr) => {
        if (err) {
          atom.notifications.addError(
            `Impossible to pull ${remote} ${branch}`,
            {
              detail: stderr.toString() + "\n" + err.toString(),
            },
          );
        } else {
          atom.notifications.addSuccess(`Pulled ${remote} ${branch}`, {
            detail: stdout,
          });
        }
      },
    );
  };
}
