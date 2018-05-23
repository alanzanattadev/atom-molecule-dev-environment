"use babel";
// @flow

export type SetConsoleSource = {
  type: "ADD_CONSOLE_SOURCE",
  payload: {
    name: string,
    isChecked: boolean,
  },
};

export function addConsoleSource(
  source: string,
  status: boolean,
): SetConsoleSource {
  return {
    type: "ADD_CONSOLE_SOURCE",
    payload: {
      name: source,
      isChecked: status,
    },
  };
}
