"use babel";
// @flow

import type { Diagnostic } from "../../DiagnosticsFeature/Types/types";
import type { List } from "immutable";

function isValidType(diagnostic: Diagnostic): boolean {
  return diagnostic.type == "warning" || diagnostic.type == "error";
}

function isValidLocation(diagnostic: Diagnostic): boolean {
  return (
    diagnostic.location !== undefined &&
    diagnostic.location.path !== undefined &&
    diagnostic.location.line !== undefined &&
    diagnostic.location.column !== undefined
  );
}

function hasMessageString(diagnostic: Diagnostic): boolean {
  return typeof diagnostic.message === "string";
}

export default function DiagnosticsToLint(
  diagnostics: List<Diagnostic>,
): List<Diagnostic> {
  return diagnostics
    .filter(hasMessageString)
    .filter(isValidType)
    .filter(isValidLocation);
}
