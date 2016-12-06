'use babel'
// @flow
import type {File} from "../Types/types.js.flow";
import {exec} from 'child_process';
import {getStatus} from "./GetStatus";

export type CommitAction = (dispatch: (action: any) => void) => void;

export function commit(message: string, files: Array<File>): CommitAction {
  return dispatch => {
    let child = exec(`git add ${files.filter(file => file.status != 'removed').map(file => file.path).join(' ')} && git commit -m "${message}"`, (err, stdout, stderr) => {
      if (err) {
        atom.notifications.addError("Impossible to commit", {
          detail: stderr + '\n' + err.toString()
        });
      } else {
        atom.notifications.addSuccess("Committed", {
          detail: stdout
        });
      }
      dispatch(getStatus());
    });
  };
};
