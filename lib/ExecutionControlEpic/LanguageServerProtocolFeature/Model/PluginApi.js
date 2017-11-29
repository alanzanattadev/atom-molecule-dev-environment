"use babel";
// @flow

import type { PublishDiagnosticsParams } from "../../DiagnosticsFeature/Types/types.js";
import type { TaskAPI, CacheBlob } from "../Types/pluginApi";
import type { AugmentedEventType } from "../Types/augmented";
import { List } from "immutable";
import moment from "moment";

export type NotificationSender = (
  message: AugmentedEventType,
  args?: Object,
) => void;

export function provideDiagnostics(sender: NotificationSender) {
  return {
    setForPath(publishDiagnostics: PublishDiagnosticsParams): void {
      sender("textDocument/publishDiagnostics", {
        diagnostics: publishDiagnostics.diagnostics,
        uri: publishDiagnostics.uri,
      });
    },
    setForWorkspace(publishDiagnostics: PublishDiagnosticsParams): void {
      sender("workspace/publishDiagnostics", {
        diagnostics: publishDiagnostics.diagnostics,
        uri: publishDiagnostics.uri,
      });
    },
    clearAll(): void {
      sender("workspace/clearDiagnostics");
    },
  };
}

export function provideBusy(sender: NotificationSender) {
  return {
    switchToBusyMode(): void {
      sender("workspace/busy", { isBusy: true });
    },
    switchToWaitingMode(): void {
      sender("workspace/busy", { isBusy: false });
    },
  };
}

export function provideCache() {
  let cache = List();
  return {
    get(): List<CacheBlob> {
      return cache;
    },
    push(data: any): void {
      cache.push({ data: data, time: moment().unix() });
    },
  };
}

export default function(sender: NotificationSender): TaskAPI {
  return {
    diagnostics: provideDiagnostics(sender),
    busy: provideBusy(sender),
    cache: provideCache(),
  };
}
