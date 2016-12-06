'use babel'
// @flow
import type {Stash} from "../Types/types.js.flow";
import { fromJS } from "immutable";

export default function Stashes(state: StashesReducer = [], action: any): StashesReducer {
  switch(action.type) {
    case "STASH_CHANGED": return [].concat(action.payload.stashes);
    default: return state;
  }
}

export type StashesReducer = Array<Stash>;
