"use babel";
// @flow

import type { EventType } from "./standard";

export type AugmentedEventType =
  | EventType
  | "workspace/publishDiagnostics"
  | "workspace/clearDiagnostics"
  | "workspace/busy"
  | "terminal/init"
  | "terminal/input"
  | "terminal/output"
  | "terminal/resize"
  | "strategy/init"
  | "watcher/watch";

export const DiagnosticSeveritySuccess = 5;
