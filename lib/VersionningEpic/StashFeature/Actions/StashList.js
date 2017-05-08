"use babel";
// @flow

import { exec } from "child_process";
import { stashChanged } from "./StashChanged";
import { getStashesFromStashListOutput } from "../Model/stashList";
import type {
  PackageInfos,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import path from "path";

export type StashListAction = (dispatch: (action: any) => void) => void;

export function stashList(packageInfos: PackageInfos): StashListAction {
  return dispatch => {
    exec(
      "git stash list",
      { cwd: path.dirname(packageInfos.path) },
      (err, stdout) => {
        if (!err) {
          dispatch(stashChanged(getStashesFromStashListOutput(stdout)));
        }
      },
    );
  };
}
