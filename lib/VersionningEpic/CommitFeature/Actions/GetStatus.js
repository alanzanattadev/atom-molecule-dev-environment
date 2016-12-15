'use babel'
// @flow
import {statusChanged} from "./StatusChanged";
import {getStatusesFromStatusOutput} from "../Model/status";
import {exec} from 'child_process';
import type {PackageInfos} from '../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow';
import path from 'path';

export type GetStatusAction = (dispatch: (action: any) => void) => void;

export function getStatus(packageInfos: PackageInfos): GetStatusAction {
  return dispatch => {
    exec('git status --porcelain', {cwd: path.dirname(packageInfos.path)}, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        let files = getStatusesFromStatusOutput(stdout);
        dispatch(statusChanged(files, packageInfos));
      }
    });
  }
};
