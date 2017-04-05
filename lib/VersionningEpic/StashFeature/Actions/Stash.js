"use babel";
// @flow

import {exec} from "child_process";
import type {PackageInfos} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import path from "path";
import notifications from "atom";

export type StashAction = (dispatch: (action: any) => void) => void;

export function stash(packageInfos: PackageInfos): StashAction {
  return () => {
    exec("git stash", { cwd: path.dirname(packageInfos.path) }, (
      err,
      stdout,
      stderr,
    ) => {
      if (err) {
        notifications.addError("Impossible to stash", {
          detail: err.toString() + "\n" + stderr.toString(),
        });
      } else {
        notifications.addSuccess("stashed", {
          detail: stdout,
        });
      }
    });
  };
}
