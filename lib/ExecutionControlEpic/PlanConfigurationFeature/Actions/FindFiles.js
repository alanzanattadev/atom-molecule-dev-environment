"use babel";
// @flow

import {
  refreshPackages,
} from "../../../ProjectSystemEpic/PackageFeature/Actions/RefreshPackages";
import type {
  PackageTester,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";

export type FindFilesAction = (dispatch: (action: any) => void) => void;

export function findFiles(tester: PackageTester, id: string): FindFilesAction {
  return dispatch => {
    const rootPath = global.atom.project.getPaths()[0];
    let plugins = [
      {
        tool: { name: id, id: id, iconUri: "" },
        isPackage: tester,
      },
    ];
    dispatch(refreshPackages(rootPath, plugins));
  };
}
