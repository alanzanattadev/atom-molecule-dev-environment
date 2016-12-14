'use babel'
// @flow
import {statusChanged} from "./StatusChanged";
import {getStatusesFromStatusOutput} from "../Model/status";
import {exec} from 'child_process';

export type GetStatusAction = (dispatch: (action: any) => void) => void;

export function getStatus(): GetStatusAction {
  return dispatch => {
    exec('git status --porcelain', (err, stdout, stderr) => {
      if (err) {
        
      } else {
        let files = getStatusesFromStatusOutput(stdout);
        dispatch(statusChanged(files));
      }
    });
  }
};
