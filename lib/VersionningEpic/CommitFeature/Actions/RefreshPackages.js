'use babel'
// @flow
import {packagesRefreshed} from '../../../ProjectSystemEpic/PackageFeature/Actions/PackagesRefreshed';
import {findPackages} from '../../../ProjectSystemEpic/PackageFeature/Model/FindPackages';



export type RefreshPackagesAction = (dispatch: (action: any) => void) => void;

export function refreshPackages(rootPath: string): RefreshPackagesAction {
  return dispatch => {
    let packages = findPackages(rootPath, [{tool: {name: "git", id: "git", iconUri: ""}, isPackage: ".git"}]);
    dispatch(packagesRefreshed(rootPath, packages));
  };
};
