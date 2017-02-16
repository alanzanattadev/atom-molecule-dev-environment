'use babel'
// @flow

import {selectCacheBlobsOfTask, selectCacheBlobsOfStep} from '../Selectors/CacheBlobs';
import {addCacheBlob} from '../Actions/AddCacheBlob';
import type {CacheBlob} from '../Types/types.js.flow';
import {selectTaskOfID} from '../../TaskExecutionFeature/Selectors/Tasks';
import {selectTasksReducer, selectCacheBlobsReducer} from '../../../GlobalSystem/Selectors';
import moment from 'moment';

export default function getCacheAPI(taskId: string, getState, dispatch) {
  return {
    get({step = null, excludeNullStep = true} = {}): Array<CacheBlob> {
      let blobs = selectCacheBlobsOfTask(selectCacheBlobsReducer(getState()), taskId);
      return step ? selectCacheBlobsOfStep(blobs, step, {excludeNull: excludeNullStep}) : blobs;
    },
    push(data: any, step: boolean = false): void {
      dispatch(addCacheBlob({
        data: data,
        step: step == true ? selectTaskOfID(selectTasksReducer(getState()), taskId).step : null,
        taskId: taskId,
        time: moment().unix(),
      }));
    },
  };
}
