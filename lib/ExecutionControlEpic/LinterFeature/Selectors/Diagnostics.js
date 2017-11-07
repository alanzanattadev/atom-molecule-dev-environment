"use babel";
// @flow

import type { Diagnostic } from "../../DiagnosticsFeature/Types/types";

function isValidType(diagnostic){
  return (diagnostic.type == "warning" || diagnostic.type == "error") ? true : false;
}

function isValidLocation(diagnostic){
  return diagnostic.location != undefined ? true : false;
}

export function DiagnosticsToLint(
  diagnostics: Array<Diagnostic>
): Array<Diagnostic> {
  let newArray = diagnostics.filter(isValidType);
  return newArray;
}

export function DiagnosticsWithLocation(
  diagnostics: Array<Diagnostic>
): Array<Diagnostic> {
  let newArray = diagnostics.filter(isValidLocation);
  return newArray;
}
