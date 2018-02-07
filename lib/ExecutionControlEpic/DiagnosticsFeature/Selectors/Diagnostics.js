"use babel";
// @flow

import type { DiagnosticsReducer } from "../Reducers/Diagnostics";
import type { DiagnosticSeverity, MoleculeDiagnostic } from "../Types/types";
import { List, Map } from "immutable";

export function selectDiagnosticsOfTask(
  diagnostics: DiagnosticsReducer,
  taskId: string,
): Map<string, Map<DiagnosticSeverity, List<MoleculeDiagnostic>>> {
  return diagnostics.get(taskId) || Map();
}

export function selectDiagnosticsOfStep(
  diagnostics: Map<string, Map<DiagnosticSeverity, List<MoleculeDiagnostic>>>,
  step: number,
): Map<string, Map<DiagnosticSeverity, List<MoleculeDiagnostic>>> {
  return diagnostics.map(severityMap =>
    severityMap.map(list => list.filter(d => d.step === step)),
  );
}

export function selectLastDiagnostics(
  diagnostics: Map<string, Map<DiagnosticSeverity, List<MoleculeDiagnostic>>>,
): Map<string, Map<DiagnosticSeverity, List<MoleculeDiagnostic>>> {
  const max = diagnostics
    .map(severityMap =>
      severityMap.reduce((red, cur) => red.concat(cur), List()),
    )
    .reduce((red, cur) => red.concat(cur), List())
    .reduce((red, value) => (value.step > red ? value.step : red), 0);
  return selectDiagnosticsOfStep(diagnostics, max);
}
