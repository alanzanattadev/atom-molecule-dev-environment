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
