"use babel";
// @flow

import type { DiagnosticsReducer } from "../Reducers/Diagnostics";
import type { Diagnostic, DiagnosticSeverity } from "../Types/types.js.flow";
import { Map, List } from "immutable";

export function selectDiagnosticsOfTask(
  diagnostics: DiagnosticsReducer,
  taskId: string,
): Map<string, Map<DiagnosticSeverity, List<Diagnostic>>> {
  return diagnostics.get(taskId) || Map();
}

export function selectDiagnosticsOfStep(
  diagnostics: Map<string, Map<DiagnosticSeverity, List<Diagnostic>>>,
  step: number,
): Map<string, Map<DiagnosticSeverity, List<Diagnostic>>> {
  return diagnostics.map(severityMap =>
    severityMap.map(list => list.filter(d => d.step === step)),
  );
}

export function selectLastDiagnostics(
  diagnostics: Map<string, Map<DiagnosticSeverity, List<Diagnostic>>>,
): Map<string, Map<DiagnosticSeverity, List<Diagnostic>>> {
  const max = diagnostics
    .map(severityMap =>
      severityMap
        .map(list => list)
        .reduce((red, cur) => red.concat(cur), List()),
    )
    .reduce((red, cur) => red.concat(cur), List())
    .reduce((red, value) => (value.step > red ? value.step : red), 0);
  return selectDiagnosticsOfStep(diagnostics, max);
}
