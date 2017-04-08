"use babel";
// @flow

import type { File } from "../Types/types.js.flow";
import { exec } from "child_process";
import { getStatus } from "./GetStatus";
import type {
  PackageInfos,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import path from "path";

export type CommitAction = (dispatch: (action: any) => void) => void;

export function commit(
  message: string,
  files: Array<File>,
  packageInfos: PackageInfos,
): CommitAction {
  return dispatch => {
    exec(
      `git add ${files
        .filter(file => file.status != "removed")
        .map(file => file.path)
        .join(" ")} && git commit -m "${message}"`,
      { cwd: path.dirname(packageInfos.path) },
      (err, stdout, stderr) => {
        if (err) {
          global.atom.notifications.addError("Impossible to commit", {
            detail: stderr + "\n" + err.toString(),
          });
        } else {
          global.atom.notifications.addSuccess("Committed", {
            detail: stdout,
          });
        }
        dispatch(getStatus(packageInfos));
      },
    );
  };
}
