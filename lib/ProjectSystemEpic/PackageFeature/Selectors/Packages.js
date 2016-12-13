'use babel'
// @flow

import type {PackagesReducer} from '../Reducers/Packages';

export function selectPackagesOfTool(state: PackagesReducer, toolId: string) {
  return state.filter(p => p.plugin.tool.id == toolId);
}
