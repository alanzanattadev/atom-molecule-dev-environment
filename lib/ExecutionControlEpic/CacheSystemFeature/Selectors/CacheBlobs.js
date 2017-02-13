'use babel'
// @flow

import type {CacheBlob} from '../Types/types.js.flow';

export function selectCacheBlobsOfTask(blobs: Array<CacheBlob>, taskId: string) {
  return blobs.filter(blob => blob.taskId == taskId);
};

export function selectCacheBlobsOfStep(blobs: Array<CacheBlob>, step: number, {excludeNull = true}: {excludeNull: boolean} = {}) {
  if (step == null)
    return blobs;
  else
    return blobs.filter(blob => blob.step == step || (excludeNull == false && blob.step == null));
};
