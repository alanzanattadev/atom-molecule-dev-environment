"use babel";
// @flow

import type { MoleculeDiagnostic } from "../../DiagnosticsFeature/Types/types";
import type { DiagnosticsReducer } from "../../DiagnosticsFeature/Reducers/Diagnostics";
import { List } from "immutable";

function isValidLocation(diagnostic: MoleculeDiagnostic): boolean {
  return diagnostic.path && diagnostic.path.length > 0;
}

export default function DiagnosticsToLint(
  diagnostics: DiagnosticsReducer,
): List<MoleculeDiagnostic> {
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
