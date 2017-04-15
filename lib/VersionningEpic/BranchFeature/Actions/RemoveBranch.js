"use babel";
// @flow

import type {
  PackageInfos,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import path from "path";
import { exec } from "child_process";

export type RemoveBranchAction = (dispatch: (action: any) => void) => void;

export function removeBranch(
  branch: string,
  packageInfos: PackageInfos,
): RemoveBranchAction {
  return () => {
    exec(`git branch -d ${branch}`, { cwd: path.dirname(packageInfos.path) }, (
      err,
      stdout,
      stderr,
    ) => {
      if (err) {
        global.atom.notifications.addError(
          `Impossible to remove branch ${branch}`,
          {
            detail: stderr.toString() + "\n" + err.toString(),
          },
        );
      } else {
        global.atom.notifications.addSuccess(`Remove branch ${branch}`, {
          detail: stdout,
        });
      }
    });
  };
}
