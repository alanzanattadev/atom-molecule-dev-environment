"use babel";
// @flow

import type {File} from "../Types/types.js.flow";

export default function GitIndex(
  state: GitIndexReducer = [],
  action: any,
): GitIndexReducer {
  switch (action.type) {
    case "STATUS_CHANGED":
      return [].concat(action.payload.files);
    default:
      return state;
  }
}

export type GitIndexReducer = Array<File>;
