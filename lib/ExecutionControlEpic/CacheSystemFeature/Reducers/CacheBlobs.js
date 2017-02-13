'use babel'
// @flow

import type {CacheBlob} from '../Types/types.js.flow';
import { fromJS } from "immutable";

export default function CacheBlobs(state: CacheBlobsReducer = [], action: any): CacheBlobsReducer {
  switch(action.type) {
    case "ADD_CACHE_BLOB":
      return fromJS(state).push(action.payload.blob).toJS();
    default:
      return state;
  }
}

export type CacheBlobsReducer = Array<CacheBlob>;
