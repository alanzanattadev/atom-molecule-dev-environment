"use babel";
// @flow

export type AddTerminalAction = {
  type: "ADD_TERMINAL",
  payload: {
    id: string,
    path: string,
  },
};

export function addTerminal(id: string, path: string): AddTerminalAction {
  return {
    type: "ADD_TERMINAL",
    payload: {
      id,
      path,
    },
  };
}
