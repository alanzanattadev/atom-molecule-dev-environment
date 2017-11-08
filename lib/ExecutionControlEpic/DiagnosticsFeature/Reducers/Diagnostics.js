"use babel";
// @flow

import type { Diagnostic, DiagnosticSeverity } from "../Types/types.js.flow";
import { List, Map } from "immutable";

export default function Diagnostics(
  state: DiagnosticsReducer = Map(),
  action: any,
): DiagnosticsReducer {
  switch (action.type) {
    case "ADD_DIAGNOSTICS_FOR_TASK":
      return action.payload.diagnostics.reduce(
        (accState, diagnostic) =>
          accState.updateIn(
            [action.payload.task, action.payload.uri, diagnostic.severity],
            (existingDiagnostics = List()) =>
              existingDiagnostics.push(diagnostic),
          ),
        state,
      );
    case "REMOVE_DIAGNOSTICS_OF_TASK":
      return state.delete(action.payload.task);
    default:
      return state;
  }
}

export type DiagnosticsReducer = Map<
  number,
  Map<string, Map<DiagnosticSeverity, List<Diagnostic>>>,
>;
