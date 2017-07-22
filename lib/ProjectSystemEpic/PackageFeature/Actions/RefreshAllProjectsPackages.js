"use babel";
// @flow

import { refreshPackages } from "./RefreshPackages";

export function refreshAllProjectsPackages(plugins) {
  return (dispatch: any) => {
    global.atom.project
      .getPaths()
      .forEach(projectPath => dispatch(refreshPackages(projectPath, plugins)));
  };
}
