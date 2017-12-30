"use babel";
// @flow

import type {
  Diagnostic,
  DiagnosticSeverity,
} from "../../DiagnosticsFeature/Types/types";
import type { DiagnosticsReducer } from "../../DiagnosticsFeature/Reducers/Diagnostics";
import { List, Map } from "immutable";

function isValidLocation(diagnostic: Diagnostic): boolean {
  return (
    diagnostic.path !== undefined &&
    diagnostic.path.length > 0 &&
    diagnostic.range !== undefined &&
    diagnostic.range.start !== undefined &&
    diagnostic.range.end !== undefined
  );
}

export default function DiagnosticsToLint(
  diagnostics: DiagnosticsReducer,
): List<Diagnostic> {
  return diagnostics
    .reduce(
      (acc, map) =>
        map.reduce(
          (list, severities) =>
            list
              .concat(severities.get(1) || List())
              .concat(severities.get(2) || List()),
          acc,
        ),
      List(),
    )
    .filter(isValidLocation);
}
