"use babel";
// @flow

export type CreateTerminalAction = {
  type: "CREATE_TERMINAL",
  payload: {
    path: string,
  },
};

export function createTerminal(path: string): CreateTerminalAction {
  return {
    type: "CREATE_TERMINAL",
    payload: {
      path,
    },
  };
}
