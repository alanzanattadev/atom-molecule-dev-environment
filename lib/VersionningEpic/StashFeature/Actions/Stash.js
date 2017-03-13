"use babel";
// @flow

import { exec } from "child_process";
import type {
  PackageInfos
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import path from "path";

export type StashAction = (dispatch: (action: any) => void) => void;

export function stash(packageInfos: PackageInfos): StashAction {
  return dispatch => {
    exec("git stash", { cwd: path.dirname(packageInfos.path) }, (
      err,
      stdout,
      stderr
    ) => {
      if (err) {
        atom.notifications.addError("Impossible to stash", {
          detail: err.toString() + "\n" + stderr.toString()
        });
      } else {
        atom.notifications.addSuccess("stashed", {
          detail: stdout
        });
      }
    });
  };
}
