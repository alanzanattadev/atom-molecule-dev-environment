"use babel";
// @flow

import type {
  PackageInfos,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import path from "path";
import { exec } from "child_process";

export type PushBranchAction = (dispatch: (action: any) => void) => void;

export function pushBranch(
  remote: string,
  branch: string,
  packageInfos: PackageInfos,
): PushBranchAction {
  return () => {
    exec(
      `git push ${remote} ${branch}`,
      { cwd: path.dirname(packageInfos.path) },
      (err, stdout, stderr) => {
        if (err) {
          global.atom.notifications.addError(
            `Impossible to push ${remote} ${branch}`,
            {
              detail: stderr.toString() + "\n" + err.toString(),
            },
          );
        } else {
          global.atom.notifications.addSuccess(
            `pushed on ${remote} ${branch}`,
            {
              detail: stdout,
            },
          );
        }
      },
    );
  };
}
