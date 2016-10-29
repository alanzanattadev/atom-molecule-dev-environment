'use babel'
// @flow
import type {DiagnosticsReducer} from "../Reducers/Diagnostics";
import type {Diagnostic} from "../Types/types.js.flow";

export function selectDiagnosticsOfTask(diagnostics: DiagnosticsReducer, taskId: string): Array<Diagnostic> {
  return diagnostics.filter(diagnostic => diagnostic.task == taskId);
}
