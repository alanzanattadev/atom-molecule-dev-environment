"use babel";
// @flow

import type { CacheBlob } from "../Types/types";
import { List } from "immutable";
import type { AddCacheBlobAction } from "../Actions/AddCacheBlob";

export default function CacheBlobs(
  state: CacheBlobsReducer = List(),
  action: AddCacheBlobAction | any,
): CacheBlobsReducer {
  switch (action.type) {
    case "ADD_CACHE_BLOB":
      return state.push(action.payload.blob);
    default:
      return state;
  }
}

export type CacheBlobsReducer = List<CacheBlob>;
