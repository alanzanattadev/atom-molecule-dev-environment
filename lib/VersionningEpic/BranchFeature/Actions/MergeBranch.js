"use babel";
// @flow

import type {
  PackageInfos,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import path from "path";
import { exec } from "child_process";

export type MergeBranchAction = (dispatch: (action: any) => void) => void;

export function mergeBranch(
  branch: string,
  packageInfos: PackageInfos,
): MergeBranchAction {
  return () => {
    exec(
      `git merge ${branch} --no-ff`,
      { cwd: path.dirname(packageInfos.path) },
      (err, stdout, stderr) => {
        if (err) {
          global.atom.notifications.addError(`Impossible to merge ${branch}`, {
            detail: stderr.toString() + "\n" + err.toString(),
          });
        } else {
          global.atom.notifications.addSuccess(`merged ${branch}`, {
            detail: stdout,
          });
        }
      },
    );
  };
}
