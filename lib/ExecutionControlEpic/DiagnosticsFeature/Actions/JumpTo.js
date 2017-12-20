"use babel";
// @flow

import type { DiagnosticLocation } from "../Types/types.js.flow";

export type JumpToAction = () => void;

export function jumpTo(location: DiagnosticLocation): JumpToAction {
  return () => {
    if (location !== undefined) {
      return global.atom.workspace.open(location.path, {
        initialLine: location.line ? location.line - 1 : 0,
        initialColumn: location.column ? location.column - 1 : 0,
      });
    }
  };
}
