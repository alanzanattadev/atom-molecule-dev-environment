"use babel";
// @flow

export type RefreshRemotesAction = (dispatch: (action: any) => void) => void;
import type {
  PackageInfos
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import { remotesRefreshed } from "./RemotesRefreshed";
import { getRemotesFromRemoteOutput } from "../Model/parser";
import { exec } from "child_process";
import path from "path";

export function refreshRemotes(
  packageInfos: PackageInfos
): RefreshRemotesAction {
  return dispatch => {
    let child = exec(`git remote`, { cwd: path.dirname(packageInfos.path) }, (
      err,
      stdout,
      stderr
    ) => {
      if (err) {
      } else {
        dispatch(remotesRefreshed(getRemotesFromRemoteOutput(stdout)));
      }
    });
  };
}
