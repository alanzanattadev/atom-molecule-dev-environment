"use babel";
// @flow

import type { DiagnosticLocation } from "../Types/types.js.flow";

export type JumpToAction = () => void;

export function jumpTo(location: DiagnosticLocation): JumpToAction {
  return () => {
    global.atom.workspace.open(location.path, {
      initialLine: location.line,
      initialcolumn: location.column,
    });
  };
}
