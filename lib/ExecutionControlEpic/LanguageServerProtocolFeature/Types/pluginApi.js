"use babel";
// @flow

import type { PublishDiagnosticsParams } from "../../DiagnosticsFeature/Types/types.js";
import { List } from "immutable";

export type CacheBlob = {
  data: any,
  time: number,
};

export type TaskAPI = {
  diagnostics: {
    setForPath: (PublishDiagnostics: PublishDiagnosticsParams) => void,
    setForWorkspace: (PublishDiagnostics: PublishDiagnosticsParams) => void,
    clearAll: () => void,
  },
  busy: {
    switchToBusyMode: () => void,
    switchToWaitingMode: () => void,
  },
  cache: {
    get(): List<CacheBlob>,
    push(data: any): void,
  },
};
