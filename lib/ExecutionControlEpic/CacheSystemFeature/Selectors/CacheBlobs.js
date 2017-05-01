"use babel";
// @flow

import type { CacheBlob } from "../Types/types.js.flow";
import { List } from "immutable";

export function selectCacheBlobsOfTask(blobs: List<CacheBlob>, taskId: string) {
  return blobs.filter(blob => blob.taskId === taskId);
}

export function selectCacheBlobsOfStep(
  blobs: List<CacheBlob>,
  step: number,
  { excludeNull = true }: { excludeNull: boolean } = {},
) {
  if (step == null) return blobs;
  else
    return blobs.filter(
      blob => blob.step == step || (excludeNull == false && blob.step == null),
    );
}
