"use babel";
// @flow

import type { Remote } from "../Types/types.js.flow";

export default function Remotes(
  state: RemotesReducer = [],
  action: any
): RemotesReducer {
  switch (action.type) {
    case "REMOTES_REFRESHED":
      return action.payload.remotes;
    default:
      return state;
  }
}

export type RemotesReducer = Array<Remote>;
