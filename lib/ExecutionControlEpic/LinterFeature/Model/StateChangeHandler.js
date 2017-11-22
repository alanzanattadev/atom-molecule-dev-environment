"use babel";
// @flow

import store from "../../../GlobalSystem/Store";
import selector from "../Selectors/Diagnostics";
import type { Diagnostic } from "../../DiagnosticsFeature/Types/types";
import { selectDiagnosticsReducer } from "../../../GlobalSystem/Selectors";

export default function handleStateChange(linter: any) {
  return function() {
    let diagnostics = selector(selectDiagnosticsReducer(store.getState()));
    linter.clearMessages();
    let messages = diagnostics.map(function(diagnostic: Diagnostic) {
      return {
        severity: diagnostic.type,
        location: {
          file: diagnostic.location.path,
          position: [
            [diagnostic.location.line, 0],
            [diagnostic.location.line, diagnostic.location.column],
          ],
        },
        excerpt: diagnostic.message,
        description: diagnostic.message,
      };
    });
    if (!messages.isEmpty()) linter.setAllMessages(messages.toArray());
  };
}
