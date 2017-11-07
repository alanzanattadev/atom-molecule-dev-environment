"use babel";
// @flow

import store from "../../../GlobalSystem/Store";
import selector from "../Selectors/Diagnostics";

export default function handleStateChange(linter: any) {
  return function() {
    let diagnostics = selector(store.getState().diagnostics);
    linter.clearMessages();
    diagnostics.forEach(diagnostic => {
      linter.setMessages(diagnostic.location.path, [
        {
          severity: "info",
          location: {
            file: diagnostic.location.path,
            position: [
              [diagnostic.location.line, 0],
              [diagnostic.location.line, 10],
            ],
          },
          excerpt: diagnostic.message,
          description: diagnostic.message,
        },
      ]);
    });
  };
}
