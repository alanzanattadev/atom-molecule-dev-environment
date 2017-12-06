"use babel";
// @flow

import { List } from "immutable";
import { ON_CREATED, ON_DELETED, ON_MODIFIED } from "./fileEventsHelpers";
import type { WatchmanClient, WatchExpression } from "../Types/types.js.flow";

export const makeSubscription = (
  client: WatchmanClient,
  subData: any,
  observer: Object,
  expression: WatchExpression,
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
      if (listFiles.size === 0) {
        listFiles = listFiles.concat(resp.files.map(file => file.name));
      }

      observer.next(
        resp.files.filter(file => file.type === "f").map(file => {
          let fileAction = ON_MODIFIED;
          if (listFiles.find(test => test === file.name)) {
            if (!file.exists) {
              listFiles = listFiles.filter(test => test !== file.name);
              fileAction = ON_DELETED;
            }
          } else {
            listFiles.push(file.name);
            fileAction = ON_CREATED;
          }
          return Object.assign({
            action: fileAction,
            path: file.name,
          });
        }),
      );
    }
  });
};
