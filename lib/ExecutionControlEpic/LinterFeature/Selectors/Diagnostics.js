"use babel";
// @flow

import type { Diagnostic } from "../../DiagnosticsFeature/Types/types";
import type { List } from "immutable";

function isValidType(diagnostic) {
  return diagnostic.type == "warning" || diagnostic.type == "error";
}

function isValidLocation(diagnostic) {
  return diagnostic.location !== undefined;
}

export default function DiagnosticsToLint(
  diagnostics: List<Diagnostic>,
): List<Diagnostic> {
  return diagnostics.filter(isValidType).filter(isValidLocation);
}
