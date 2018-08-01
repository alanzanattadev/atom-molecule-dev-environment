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
                    character: change.newRange.start.column,
                    line: change.newRange.start.row,
                  },
                  end: {
                    character: change.newRange.end.column,
                    line: change.newRange.end.row,
                  },
                },
                text: change.newText,
              }))
            : undefined,
      },
    }),
  );
}
