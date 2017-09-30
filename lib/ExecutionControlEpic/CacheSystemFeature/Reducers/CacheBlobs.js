"use babel";
// @flow

import type { CacheBlob } from "../Types/types.js.flow";
import { List } from "immutable";

export default function CacheBlobs(
  state: CacheBlobsReducer = List(),
  action: { type: string, payload: any },
): CacheBlobsReducer {
  switch (action.type) {
    case "ADD_CACHE_BLOB":
      return state.push(action.payload.blob);
    case "CLEAR_CACHE_BLOB":
      return state.clear();
    default:
      return state;
  }
}

export type CacheBlobsReducer = List<CacheBlob>;
