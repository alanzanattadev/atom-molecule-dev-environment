"use babel";
// @flow

import type { DiagnosticRange } from "../Types/types.js.flow";

export type JumpToAction = () => void;

export function jumpTo(path: string, range: DiagnosticRange): JumpToAction {
  return () => {
    return global.atom.workspace.open(path, {
      initialLine: range.start.line ? range.start.line - 1 : 0,
      initialColumn: range.start.character ? range.start.character - 1 : 0,
    });
  };
}
