"use babel";
// @flow

import Rx from "rxjs";

export const createProjectsObservable = (project: atom$Project) =>
  Rx.Observable.create(observer => {
    const disposable = project.onDidChangePaths(projectPaths =>
      observer.next(projectPaths),
    );
    return () => disposable.dispose();
  });
