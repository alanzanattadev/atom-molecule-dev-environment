"use babel";
// @flow

import Rx from "rxjs";
import type { WatchMode, WatchPath } from "../Types/types.flow.js";

export const ON_MODIFIED = "modified";
export const ON_DELETED = "deleted";
export const ON_CREATED = "created";

export const createEventObservable = (
  watchMode: WatchMode,
  watchPath: WatchPath,
  path: string,
  type: RegExp,
) =>
  Rx.Observable.create(async observer => {
    const disposable = await watchPath(path, {}, events => {
      events
        .filter(event => event.path.match(type) && event.action === watchMode)
        .forEach(event => observer.next(event));
    });

    return () => {
      disposable.dispose();
    };
  });

// const { watchPath } = require("atom");
//
// createEventObservable(
//   ON_MODIFIED,
//   watchPath,
//   "/home/moko/Molecule/atom-molecule-dev-environment",
//   /.*\.js$/gi,
// ).subscribe(
//   x => {
//     console.log(x);
//   },
//   err => console.log(err),
//   () => console.log("completed"),
// );
