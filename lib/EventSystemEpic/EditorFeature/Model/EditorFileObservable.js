"use babel";
// @flow

import Rx from "rxjs";
import type {
  AtomEditorOpenEvent,
  AtomEditorSaveEvent,
  AtomEditorChangeEvent,
} from "../Types/editorEvents";

export const EditorFileObservable = Rx.Observable.create(observer => {
  function getEditorObservable(editor) {
    return Rx.Observable.create(observer => {
      const disposables = [
        editor.onDidSave((event: AtomEditorSaveEvent) =>
          observer.next({
            type: "didSave",
            path: editor.getPath(),
            event,
          }),
        ),
        editor.onDidStopChanging((event: AtomEditorChangeEvent) =>
          observer.next({
            type: "didChange",
            path: editor.getPath(),
            event,
          }),
        ),
        editor.onDidDestroy(() =>
          observer.next({
            type: "didClose",
            path: editor.getPath(),
            event: {},
          }),
        ),
      ];
      return function unsubscribe() {
        disposables.forEach(disp => disp.dispose());
      };
    });
  }
  global.atom.workspace
    .getTextEditors()
    .forEach(editor => observer.next(getEditorObservable(editor)));
  global.atom.workspace.onDidAddTextEditor((event: AtomEditorOpenEvent) => {
    observer.next(getEditorObservable(event.textEditor));
    observer.next(
      Rx.Observable.of({
        type: "didOpen",
        path: event.textEditor.getPath(),
        event,
      }),
    );
  });
  global.atom.workspace.onDidChangeActiveTextEditor(editor => {
    if (editor) {
      observer.next(getEditorObservable(editor));
      observer.next(
        Rx.Observable.of({
          type: "didOpen",
          path: editor.getPath(),
          event: {
            textEditor: editor,
          },
        }),
      );
    }
  });
})
  .mergeAll()
  .share();
