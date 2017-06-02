"use babel";
// @flow
export type RefreshPackagesAction = (dispatch: (action: any) => void) => void;
import { packagesRefreshed } from "./PackagesRefreshed";
import {
  DevToolsControllerInstance,
} from "../../../ExecutionControlEpic/DevtoolLoadingFeature/Model/DevToolsController";
import { findPackages } from "../Model/FindPackages";

export function refreshPackages(rootPath: string): RefreshPackagesAction {
  return dispatch => {
    let plugins = DevToolsControllerInstance.getPackagesPlugins();
    findPackages(rootPath, plugins).toPromise().then(packages => {
      dispatch(packagesRefreshed(rootPath, packages));
    });
  };
}
