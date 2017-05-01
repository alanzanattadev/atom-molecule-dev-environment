"use babel";
// @flow

import path from "path";
import { exec } from "child_process";
import type {
  PackageInfos,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import { branchesRefreshed } from "./BranchesRefreshed";
import { getBranchesFromBranchOutput } from "../Model/parser";

export type RefreshBranchesAction = (dispatch: (action: any) => void) => void;

export function refreshBranches(
  packageInfos: PackageInfos,
): RefreshBranchesAction {
  return dispatch => {
    exec(
      `git branch`,
      { cwd: path.dirname(packageInfos.path) },
      (err, stdout) => {
        if (!err) {
          dispatch(
            branchesRefreshed(getBranchesFromBranchOutput(stdout.toString())),
          );
        }
      },
    );
  };
}
