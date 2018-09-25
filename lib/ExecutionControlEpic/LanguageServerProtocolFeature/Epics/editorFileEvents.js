"use babel";
// @flow

import type { MoleculeAtomEditorEvent } from "../../../EventSystemEpic/EditorFeature/Types/editorEvents";

export function editorFileEvents(editorObservable) {
  return editorObservable.withLatestFrom(
    editorObservable.scan((versions, event: MoleculeAtomEditorEvent) => {
      if (event.type === "didChange") {
        return {
          ...versions,
          [event.path]: (versions[event.path] || 0) + 1,
        };
      } else {
        return versions;
      }
    }, {}),
    (event: MoleculeAtomEditorEvent, versions) => ({
      message: event.type,
      args: {
        textDocument: {
          uri: event.path,
          version:
            event.type === "didOpen" || event.type === "didChange"
              ? versions[event.path] || 0
              : undefined,
          text:
            event.type === "didOpen"
              ? event.event.textEditor.getText()
              : undefined,
          languageId:
            event.type === "didOpen"
              ? event.event.textEditor.getGrammar().name
              : undefined,
        },
        contentChanges:
          event.type === "didChange"
            ? event.event.changes.map(change => ({
                range: {
                  start: {
                    character: change.oldRange.start.column,
                    line: change.oldRange.start.row,
                  },
                  end: {
                    character: change.oldRange.end.column,
                    line: change.oldRange.end.row,
                  },
                },
                text: change.newText,
              }))
            : undefined,
      },
    }),
  );
}
