"use babel";
// @flow

import type { Diagnostic } from "../../DiagnosticsFeature/Types/types.js.flow";
import { List } from "immutable";

export type SendDiagnosticsToLinter = {
  type: "SEND_DIAGNOSTICS_TO_LINTER",
  payload: {
    diagnostics: List<Diagnostic>,
  },
};

export function sendDiagnosticsToLinter(
  diagnostics: List<Diagnostic>,
): SendDiagnosticsToLinter {
  return {
    type: "SEND_DIAGNOSTICS_TO_LINTER",
    payload: {
      diagnostics,
    },
  };
}
