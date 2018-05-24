"use babel";
// @flow

import { Map } from "immutable";
import type { TerminalIdentifier } from "../Types/types";

export default function(state: TerminalReducer = Map(), action: Object) {
  let path = undefined;
  switch (action.type) {
    case "ADD_TERMINAL":
      return state.update(action.payload.path, (idMap = Map()) =>
        idMap.set(action.payload.id, { id: action.payload.id }),
      );
    case "REMOVE_TERMINAL":
      path = state.findKey(v => v.get(action.payload.id) !== undefined);
      if (path) return state.removeIn([path, action.payload.id]);
      else return state;
    default:
      return state;
  }
}

export type TerminalReducer = Map<string, Map<string, TerminalIdentifier>>;
