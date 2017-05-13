"use babel";
// @flow

import type { Stash } from "../Types/types.js.flow";

export type StashChangedAction = {
  type: "STASH_CHANGED",
  payload: {
    stashes: Array<Stash>,
  },
};

export function stashChanged(stashes: Array<Stash>): StashChangedAction {
  return {
    type: "STASH_CHANGED",
    payload: {
      stashes: stashes,
    },
  };
}
