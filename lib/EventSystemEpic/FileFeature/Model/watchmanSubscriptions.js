"use babel";
// @flow

import { List } from "immutable";
import { ON_CREATED, ON_DELETED, ON_MODIFIED } from "./fileEventsHelpers";
import type { WatchExpression, WatchmanClient } from "../Types/types";

export const makeSubscription = (
  client: WatchmanClient,
  subData: any,
  observer: Object,
  expression: WatchExpression,
  ignoreInitialEvents: boolean,
) => {
  const watch = subData.watch;
  const relative_path = subData.path;
  let listFiles = List();

  const sub = {
    expression: expression.expression,
    fields: ["name", "size", "exists", "type"],
    relative_root: relative_path || undefined,
  };

  client.command(["subscribe", watch, "watchSubscription", sub], error => {
    if (error) {
      observer.error(error);
      return;
    }
  });

  client.on("subscription", resp => {
    if (resp.subscription !== "watchSubscription") return;

    if (resp.files && resp.files.length > 0) {
      let stopInitialFlow = false;

      if (listFiles.size === 0) {
        listFiles = listFiles.concat(resp.files.map(file => file.name));
        stopInitialFlow = ignoreInitialEvents;
      }

      if (!stopInitialFlow) {
        observer.next(
          resp.files.filter(file => file.type === "f").map(file => {
            let fileAction = ON_MODIFIED;
            if (listFiles.find((test: string) => test === file.name)) {
              if (!file.exists) {
                listFiles = listFiles.filter(test => test !== file.name);
                fileAction = ON_DELETED;
              }
            } else {
              listFiles = listFiles.push(file.name);
              fileAction = ON_CREATED;
            }
            return Object.assign({
              action: fileAction,
              path: file.name,
            });
          }),
        );
      }
    }
  });
};
