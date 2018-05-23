"use babel";
// @flow

export type SourceStatus = {
  type: "UPDATE_SOURCE_STATUS",
  payload: {
    name: string,
    isChecked: boolean,
  },
};

export function updateSourceStatus(
  source: string,
  status: boolean,
): SourceStatus {
  return {
    type: "UPDATE_SOURCE_STATUS",
    payload: {
      name: source,
      isChecked: status,
    },
  };
}
