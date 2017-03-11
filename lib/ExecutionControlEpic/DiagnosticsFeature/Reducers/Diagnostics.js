"use babel";
// @flow

import type { Diagnostic } from "../Types/types.js.flow";
import { fromJS, List } from "immutable";

export default function Diagnostics(
  state: DiagnosticsReducer = List(),
  action: any
): DiagnosticsReducer {
  switch (action.type) {
    case "ADD_DIAGNOSTIC_FOR_TASK":
      return state.push(action.payload.diagnostic);
    case "ADD_DIAGNOSTICS_FOR_TASK":
      return state.concat(action.payload.diagnostics);
    case "REMOVE_DIAGNOSTICS_OF_TASK":
      return state.filter(diagnostic => diagnostic.task != action.payload.task);
    default:
      return state;
  }
}

export type DiagnosticsReducer = List<Diagnostic>;
