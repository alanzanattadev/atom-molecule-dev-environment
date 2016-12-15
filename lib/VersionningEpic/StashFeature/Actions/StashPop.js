'use babel'
// @flow

import {exec} from 'child_process';
import type {PackageInfos} from '../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow';
import path from 'path';

export type StashPopAction = (dispatch: (action: any) => void) => void;

export function stashPop(packageInfos: PackageInfos): StashPopAction {
  return dispatch => {
    exec('git stash pop', {cwd: path.dirname(packageInfos.path)}, (err, stdout, stderr) => {
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
