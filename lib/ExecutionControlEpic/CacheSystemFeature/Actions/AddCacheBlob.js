"use babel";
// @flow

import type { CacheBlob } from "../Types/types.js.flow";

export type AddCacheBlobAction = {
  type: "ADD_CACHE_BLOB",
  payload: {
    blob: CacheBlob,
  },
};

export function addCacheBlob(blob: CacheBlob): AddCacheBlobAction {
  return {
    type: "ADD_CACHE_BLOB",
    payload: {
      blob: blob,
    },
  };
}
