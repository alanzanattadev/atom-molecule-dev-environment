"use babel";
// @flow

import { Map } from "immutable";

const initialState = Map().setIn(["Molecule"], ["Molecule", false]);

export default function(
  state: ConsoleSourcesReducer = initialState,
  action: any,
): ConsoleSourcesReducer {
  switch (action.type) {
    case "ADD_CONSOLE_SOURCE":
      return state.setIn(
        [action.payload.name],
        [action.payload.name, action.payload.isChecked],
      );
    case "UPDATE_SOURCE_STATUS":
      return state.setIn(
        [action.payload.name],
        [action.payload.name, action.payload.isChecked],
      );
    default:
      return state;
  }
}

export type ConsoleSourcesReducer = Map<string, Array<any>>;
