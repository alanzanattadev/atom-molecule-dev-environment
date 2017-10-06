"use babel";
// @flow

import Rx from "rxjs";
import { List } from "immutable";
import {
  ON_CREATED,
  ON_DELETED,
  ON_MODIFIED,
} from "./createEventObservable.js";
import type { WatchMode } from "../Types/types.flow.js";

export const makeSubscription = (
  watchMode : WatchMode,
  client,
  subData,
  observer,
  fileType,
) => {
  const watch = subData.watch;
  const relative_path = subData.path;
  let listFiles;
  let clock;

  console.log(watchMode);

  if (watchMode !== ON_CREATED) {
    client.command(["clock", watch], (error, resp) => {
      if (error) {
        console.error("Failed to query clock:", error);
        observer.error(error);
        return;
      }
      clock = resp.clock;
    });
  }

  const sub = {
    expression: fileType.expression,
    fields: ["name", "size", "exists", "type"],
    since: watchMode !== ON_CREATED ? clock : undefined,
    relative_root: relative_path || undefined,
  };

  client.command(
    ["subscribe", watch, "watchSubscription", sub],
    (error, resp) => {
      if (error) {
        console.error("failed to subscribe: ", error);
        observer.error(error);
        return;
      }
      console.log("subscription " + resp.subscribe + " established");
    },
  );

  client.on("subscription", resp => {
    if (resp.subscription !== "watchSubscription") return;

    if (resp.files && resp.files.length > 0) {
      if (watchMode === ON_CREATED && listFiles === undefined) {
        listFiles = Array.from(resp.files.map(file => file.name));
      }

      resp.files
        .filter(
          file =>
            file.type === "f" &&
            (watchMode === ON_DELETED ? !file.exists : true),
        )
        .forEach(file => {
          if (watchMode === ON_CREATED) {
            if (listFiles.find(test => test === file.name)) {
              if (!file.exists) {
                listFiles = listFiles.filter(test => test !== file.name);
              }
              return;
            } else {
              listFiles.push(file.name);
            }
          }
          observer.next(file);
        });
    }
  });
};
