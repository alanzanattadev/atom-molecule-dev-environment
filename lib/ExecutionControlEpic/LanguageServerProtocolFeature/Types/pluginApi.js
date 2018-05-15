"use babel";
// @flow

import type { PublishDiagnosticsParams } from "../../LanguageServerProtocolFeature/Types/standard";
import { List } from "immutable";

export type CacheBlob = {
  data: any,
  time: number,
};

export type TaskAPI = {
  diagnostics: {
    setForPath: (publishDiagnostics: PublishDiagnosticsParams) => void,
    setForWorkspace: (publishDiagnostics: PublishDiagnosticsParams) => void,
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
