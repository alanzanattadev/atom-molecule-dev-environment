"use babel";
// @flow
import type {Remote} from "../Types/types.js.flow";


export type RemotesRefreshedAction = {
  type: "REMOTES_REFRESHED",
  payload: {
    remotes: Array<Remote>,
  },
};

export function remotesRefreshed(
  remotes: Array<Remote>,
): RemotesRefreshedAction {
  return {
    type: "REMOTES_REFRESHED",
    payload: {
      remotes,
    },
  };
}
