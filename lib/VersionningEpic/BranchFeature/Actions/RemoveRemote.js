"use babel";
// @flow

import type {
  PackageInfos,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import path from "path";
import { exec } from "child_process";
import { refreshRemotes } from "./RefreshRemotes";

export type RemoveRemoteAction = (dispatch: (action: any) => void) => void;

export function remoteRemote(
  remote: string,
  packageInfos: PackageInfos,
): RemoveRemoteAction {
  return dispatch => {
    exec(
      `git remote remove ${remote}`,
      { cwd: path.dirname(packageInfos.path) },
      (err, stdout, stderr) => {
        if (err) {
          global.atom.notifications.addError(
            `Impossible to remove remote ${remote}`,
            {
              detail: stderr.toString() + "\n" + err.toString(),
            },
          );
        } else {
          global.atom.notifications.addSuccess(`Removed remote ${remote}`, {
            detail: stdout,
          });
          dispatch(refreshRemotes(packageInfos));
        }
      },
    );
  };
}
