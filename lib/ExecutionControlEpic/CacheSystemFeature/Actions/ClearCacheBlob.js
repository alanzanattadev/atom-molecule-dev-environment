"use babel";
// @flow

export type ClearCacheBlobAction = {
  type: "CLEAR_CACHE_BLOB",
};

export function clearCacheBlob(): ClearCacheBlobAction {
  return {
    type: "CLEAR_CACHE_BLOB",
  };
}
