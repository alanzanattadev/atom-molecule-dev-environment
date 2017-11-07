"use babel";
// @flow

import type { Diagnostic } from "../../DiagnosticsFeature/Types/types.js.flow";
import { List } from "immutable";

export default function Diagnostics(
  state: LinterReducer = List(),
  action: any,
): LinterReducer {
  switch (action.type) {
    case "SEND_DIAGNOSTICS_TO_LINTER":
      return state; //.concat(action.payload.diagnostics);
    default:
      return state;
  }
}

export type LinterReducer = List<Diagnostic>;
