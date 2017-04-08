"use babel";
// @flow
import type { DiagnosticsReducer } from "../Reducers/Diagnostics";
import type { Diagnostic } from "../Types/types.js.flow";
import { List } from "immutable";

export function selectDiagnosticsOfTask(
  diagnostics: DiagnosticsReducer,
  taskId: string,
): List<Diagnostic> {
  return diagnostics.filter(diagnostic => diagnostic.task == taskId);
}

export function selectDiagnosticsOfStep(
  diagnostics: List<Diagnostic>,
  step: number,
) {
  return diagnostics.filter(diagnostic => diagnostic.step == step);
}

export function selectLastDiagnostics(diagnostics: List<Diagnostic>) {
  const max = diagnostics
    .map(d => d.step)
    .reduce((red, value) => value > red ? value : red, 0);
  return selectDiagnosticsOfStep(diagnostics, max);
}
