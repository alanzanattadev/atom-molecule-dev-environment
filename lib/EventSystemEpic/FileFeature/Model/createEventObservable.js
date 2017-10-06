"use babel";
// @flow

import Rx from "rxjs";
import { makeSubscription } from "./watchmanSubscriptions.js";
import type { WatchMode } from "../Types/types.flow.js";

export const ON_MODIFIED = "ON_MODIFIED";
export const ON_DELETED = "ON_DELETED";
export const ON_CREATED = "ON_CREATED";

export const createEventObservable = (
  watchMode: WatchMode,
  watchman,
  path: string,
  type,
) =>
  Rx.Observable.create(observer => {
    const client = new watchman.Client();

    client.capabilityCheck(
      { optional: [], required: ["relative_root"] },
      (error, resp) => {
        if (error) {
          client.end();
          observer.error(error);
          return;
        }
        client.command(["watch-project", path], (error, resp) => {
          if (error) {
            console.error("Error initiating watch:", error);
            observer.error(error);
            return;
          }
          if ("warning" in resp) {
            console.log("warning: ", resp.warning);
          }
          const data = { watch: resp.watch, path: resp.relative_path };
          makeSubscription(watchMode, client, data, observer, type);
        });
      },
    );
    return () => {
      client.end();
    };
  });

// createEventObservable(
//   ON_MODIFIED,
//   require("fb-watchman"),
//   global.atom.project.getPaths()[0],
//   require("./apiPresets.js").apiPresets.js,
// ).subscribe(
//   x => {
//     console.log(x);
//   },
//   err => console.log(err),
//   () => console.log("completed"),
// );
