"use babel";
// @flow

import Rx from "rxjs";
import type { WatchPath } from "../Types/types.flow.js";

export const createFilesWatcherObservable = (
  watchPath: WatchPath,
  path: string,
  type: RegExp,
) =>
  Rx.Observable.create(async observer => {
    const disposable = await watchPath(path, {}, events => {
      observer.next(events.filter(event => event.path.match(type)));
    });

    return () => {
      disposable.dispose();
    };
  });
