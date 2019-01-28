"use babel";
// @flow

import { Observable } from "rxjs";

export const createProjectsObservable = (project: atom$Project) =>
  Observable.create(observer => {
    const disposable = project.onDidChangePaths(projectPaths =>
      observer.next(projectPaths),
    );
    return () => disposable.dispose();
  });
