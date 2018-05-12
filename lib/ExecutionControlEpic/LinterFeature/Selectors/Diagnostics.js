"use babel";
// @flow

<<<<<<< HEAD

import type {
  Diagnostic,
  DiagnosticSeverity,
} from "../../DiagnosticsFeature/Types/types";
=======
import type { MoleculeDiagnostic } from "../../DiagnosticsFeature/Types/types";
>>>>>>> 9e8d61c1c56cd0eb150212a6ce3fca50761491d8
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
