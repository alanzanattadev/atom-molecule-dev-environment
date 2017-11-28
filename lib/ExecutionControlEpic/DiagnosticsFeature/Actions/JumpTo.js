"use babel";
// @flow

import type { DiagnosticRange } from "../Types/types.js.flow";

export type JumpToAction = () => void;

export function jumpTo(range: DiagnosticRange): JumpToAction {
  return () => {
    if (range) {
      return;
    }
    return;
    // return global.atom.workspace.open(location.path, {
    //   initialLine: location.line ? location.line - 1 : 0,
    //   initialColumn: location.column ? location.column - 1 : 0,
    // });
  };
}
