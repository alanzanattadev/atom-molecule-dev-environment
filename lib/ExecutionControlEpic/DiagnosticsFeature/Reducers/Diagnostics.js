"use babel";
// @flow

import type {
  MoleculeDiagnostic,
  DiagnosticSeverity,
} from "../Types/types.js.flow";
import { List, Map } from "immutable";

export default function Diagnostics(
  state: DiagnosticsReducer = Map(),
  action: any,
): DiagnosticsReducer {
  switch (action.type) {
    case "SET_DIAGNOSTICS_FOR_TASK":
      return action.payload.diagnostics
        .reduce((red, diagnostic) => {
          return red.update(
            diagnostic.path || action.payload.uri,
            (old = List()) => old.push(diagnostic),
          );
        }, Map())
        .entrySeq()
        .reduce((red, entry) => {
          return state.setIn(
            [action.payload.task, entry[0]],
            entry[1].reduce((acc, diagnostic) => {
              return acc.update(diagnostic.severity, (diagnostics = List()) =>
                diagnostics.push(diagnostic),
              );
            }, Map()),
          );
        }, state.setIn([action.payload.task, action.payload.uri], Map()));
    case "REMOVE_DIAGNOSTICS_OF_TASK":
      return state.delete(action.payload.task);
    default:
      return state;
  }
}

export type DiagnosticsReducer = Map<
  string,
  Map<string, Map<DiagnosticSeverity, List<MoleculeDiagnostic>>>,
>;
