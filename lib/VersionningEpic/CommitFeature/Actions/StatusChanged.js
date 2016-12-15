'use babel'
// @flow
import type {File} from "../Types/types.js.flow";
import type {PackageInfos} from '../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow';

export type StatusChangedAction = {
  type: 'STATUS_CHANGED',
  payload: {
    files: Array<File>,
    packageInfos: PackageInfos,
  };
};

export function statusChanged(files: Array<File>, packageInfos: PackageInfos): StatusChangedAction {
  return {
    type: 'STATUS_CHANGED',
    payload: {
      files: files,
      packageInfos,
    }
  };
};
