'use babel'
// @flow
import type {File} from "../Types/types.js.flow";

export type StatusChangedAction = {
  type: 'STATUS_CHANGED',
  payload: {
    files: Array<File>,
  };
};

export function statusChanged(files: Array<File>): StatusChangedAction {
  return {
    type: 'STATUS_CHANGED',
    payload: {
      files: files
    }
  };
};
