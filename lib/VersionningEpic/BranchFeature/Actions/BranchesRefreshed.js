'use babel'
// @flow

import type {Branch} from '../Types/types.js';

export type BranchesRefreshedAction = {
  type: 'BRANCHES_REFRESHED',
  payload: {
    branches: Array<Branch>
  };
};

export function branchesRefreshed(branches: Array<Branch>): BranchesRefreshedAction {
  return {
    type: 'BRANCHES_REFRESHED',
    payload: {
      branches
    }
  };
};
