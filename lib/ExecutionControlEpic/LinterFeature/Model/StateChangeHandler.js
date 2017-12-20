"use babel";
// @flow

import Uri from "vscode-uri";
import store from "../../../GlobalSystem/Store";
import selector from "../Selectors/Diagnostics";
import type {
  Diagnostic,
  DiagnosticSeverity,
} from "../../DiagnosticsFeature/Types/types";
import { selectDiagnosticsReducer } from "../../../GlobalSystem/Selectors";

function getTypeFromSeverity(severity: DiagnosticSeverity) {
  switch (severity) {
    case 1:
      return "error";
    case 2:
      return "warning";
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
    linter.clearMessages();
    let messages = diagnostics.map((diagnostic: Diagnostic) => ({
      severity: getTypeFromSeverity(diagnostic.severity),
      location: {
        file: getPath(diagnostic.path),
        position: [
          [diagnostic.range.start.line, diagnostic.range.start.character],
          [diagnostic.range.end.line, diagnostic.range.end.character],
        ],
      },
      excerpt: diagnostic.message,
      description: diagnostic.message,
    }));
    if (!messages.isEmpty()) linter.setAllMessages(messages.toArray());
  };
}
