"use babel";
// @flow

import Uri from "vscode-uri";
import store from "../../../GlobalSystem/Store";
import selector from "../Selectors/Diagnostics";
import { selectDiagnosticsReducer } from "../../../GlobalSystem/Selectors";
import type { MoleculeDiagnostic } from "../../DiagnosticsFeature/Types/types";
import {
  DiagnosticSeverityError,
  DiagnosticSeverityHint,
  DiagnosticSeverityInformation,
  DiagnosticSeverityWarning,
} from "../../LanguageServerProtocolFeature/Types/standard";

function getTypeFromSeverity(severity: number) {
  switch (severity) {
    case DiagnosticSeverityError:
      return "error";
    case DiagnosticSeverityWarning:
      return "warning";
    case DiagnosticSeverityInformation:
      return "info";
    case DiagnosticSeverityHint:
      return "hint";
    default:
      return "info";
  }
}

function getPath(path: string) {
  const uri = Uri.parse(path);
  return uri.scheme === "file" ? uri.path : path;
}

export default function handleStateChange(linter: any) {
  return function() {
    let diagnostics = selector(selectDiagnosticsReducer(store.getState()));
    let messages = diagnostics.map((diagnostic: MoleculeDiagnostic) => ({
      severity: getTypeFromSeverity(
        diagnostic.severity || DiagnosticSeverityInformation,
      ),
      location: {
        file: getPath(diagnostic.path || ""),
        position: [
          [diagnostic.range.start.line, diagnostic.range.start.character],
          [diagnostic.range.end.line, diagnostic.range.end.character],
        ],
      },
      excerpt: diagnostic.message,
      description: diagnostic.message,
    }));

    linter.clearMessages();
    if (!messages.isEmpty()) linter.setAllMessages(messages.toArray());
  };
}
