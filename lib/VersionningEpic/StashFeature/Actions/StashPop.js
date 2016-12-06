'use babel'
// @flow

import {exec} from 'child_process';

export type StashPopAction = (dispatch: (action: any) => void) => void;

export function stashPop(): StashPopAction {
  return dispatch => {
    exec('git stash pop', (err, stdout, stderr) => {
      if (err) {
        atom.notifications.addError("Impossible to stash pop", {
          detail: err + '\n' + stderr,
        });
      } else {
        atom.notifications.addSuccess("stash popped", {
          detail: stdout,
        });
      }
    });
  };
};
