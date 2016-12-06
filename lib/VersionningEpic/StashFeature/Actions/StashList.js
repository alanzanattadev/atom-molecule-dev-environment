'use babel'
// @flow

import {exec} from 'child_process';
import {stashChanged} from "./StashChanged";
import {getStashesFromStashListOutput} from "../Model/stashList";

export type StashListAction = (dispatch: (action: any) => void) => void;

export function stashList(): StashListAction {
  return dispatch => {
    exec('git stash list', (err, stdout, stderr) => {
      if (err) {

      } else {
        dispatch(stashChanged(getStashesFromStashListOutput(stdout)));
      }
    });
  };
};
