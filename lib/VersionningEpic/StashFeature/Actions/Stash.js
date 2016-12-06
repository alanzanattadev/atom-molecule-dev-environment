'use babel'
// @flow

import {exec} from 'child_process';

export type StashAction = (dispatch: (action: any) => void) => void;

export function stash(): StashAction {
  return dispatch => {
    exec('git stash', (err, stdout, stderr) => {
      if (err) {
        atom.notifications.addError("Impossible to stash", {
          detail: err + '\n' + stderr,
        })
      } else {
        atom.notifications.addSuccess("stashed", {
          detail: stdout,
        })
      }
    });
  }
};
