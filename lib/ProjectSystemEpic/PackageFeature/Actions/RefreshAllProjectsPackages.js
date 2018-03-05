"use babel";
// @flow

import { refreshPackages } from "./RefreshPackages";
import type { Plugin } from "../Types/types.js";

export function refreshAllProjectsPackages(plugins: Array<Plugin>) {
  return (dispatch: any) => {
    global.atom.project
      .getPaths()
      .forEach(projectPath => dispatch(refreshPackages(projectPath, plugins)));
  };
}
