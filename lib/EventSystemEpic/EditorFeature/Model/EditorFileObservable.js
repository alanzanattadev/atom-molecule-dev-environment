"use babel";
// @flow

import { Observable } from "rxjs";
import { mergeAll } from "rxjs/operators";
import type {
  AtomEditorChangeEvent,
  AtomEditorOpenEvent,
  AtomEditorSaveEvent,
} from "../Types/editorEvents";

export const EditorFileObservable = Observable.create(observer => {
  function getEditorObservable(editor) {
    return Observable.create(observer => {
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
  global.atom.workspace.onDidAddTextEditor((event: AtomEditorOpenEvent) => {
    observer.next(getEditorObservable(event.textEditor));
    observer.next(
      Observable.of({
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
        Observable.of({
          type: "didOpen",
          path: editor.getPath(),
          event: {
            textEditor: editor,
          },
        }),
      );
    }
  });
  global.atom.workspace.getTextEditors().forEach(editor => {
    if (editor) {
      observer.next(getEditorObservable(editor));
      observer.next(
        Observable.of({
          type: "didOpen",
          path: editor.getPath(),
          event: {
            textEditor: editor,
          },
        }),
      );
    }
  });
}).pipe(mergeAll());
