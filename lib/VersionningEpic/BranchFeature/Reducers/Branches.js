'use babel'
// @flow

import { fromJS } from "immutable";
import type {Branch} from '../Types/types.js.flow';

export default function Branches(state: BranchesReducer = [], action: any): BranchesReducer {
  switch(action.type) {
    case "BRANCHES_REFRESHED":
      return action.payload.branches;
    default:
      return state;
  }
}

export type BranchesReducer = Array<Branch>;
