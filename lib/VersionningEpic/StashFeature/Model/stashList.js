"use babel";
// @flow

import { fromJS, Map } from "immutable";
import type { Stash } from "../Types/types.js.flow";

export function getStashesFromStashListOutput(output: string): Array<Stash> {
  return output
    .split("\n")
    .map(line =>
      line.split(":").map(carac => carac.trim()).filter(carac => carac != ""))
    .filter(line => line.length > 0)
    .map(line => fromJS(line)
      .update(0, word => word.split("{")[1].split("}")[0])
      .update(1, word =>
        word.split(/(\ on\ )/).filter(word => word != " on ").reduce(
          (red, value, i) => {
            if (i == 0) return red.set("name", value);
            else return red.set("branchName", value);
          },
          Map(),
        ))
      .update(2, word => word.split(" ").reduce(
        (red, value, i) => {
          if (i == 0) return red.set("commitId", value);
          else return red.update("commitMessage", msg =>
              msg.concat(msg == "" ? value : " " + value));
        },
        Map().set("commitId", null).set("commitMessage", ""),
      ))
      .reduce(
        (red, value, i) => {
          if (i == 0) return red.set("index", parseInt(value));
          else if (i == 1)
            return red
              .set("name", value.get("name"))
              .set("branchName", value.get("branchName"));
          else
            return red
              .set("commitId", value.get("commitId"))
              .set("commitMessage", value.get("commitMessage"));
        },
        Map(),
      )
      .toJS());
}
