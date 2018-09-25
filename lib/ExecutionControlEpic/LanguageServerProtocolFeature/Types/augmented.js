"use babel";
// @flow

import type { EventType } from "./standard";

export type AugmentedEventType =
  | EventType
  | "workspace/publishDiagnostics"
  | "workspace/clearDiagnostics"
  | "workspace/busy"
  | "terminal/input"
  | "terminal/output"
  | "terminal/resize"
  | "strategy/init"
  | "packages/didChange";
