"use babel";
// @flow

export type RemoveTerminalAction = {
  type: "REMOVE_TERMINAL",
  payload: {
    id: string,
  },
};

export function removeTerminal(id: string): RemoveTerminalAction {
  return {
    type: "REMOVE_TERMINAL",
    payload: {
      id,
    },
  };
}
