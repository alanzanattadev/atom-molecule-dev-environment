"use babel";
// @flow

import ansiToHtml from "ansi-to-html";
import { Task } from "atom";
import path from "path";
import { getTmpAppPluginFolder } from "../../../GlobalSystem/Model/fs";

export default {
  outputToHTML(output: string): string {
    let Convert = new ansiToHtml();
    return Convert.toHtml(
      output
        .replace(/(?:\r\n|\r|\n)/g, "<br/>")
        .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
        .replace(/ /g, "&nbsp;"),
    );
  },
  json: {
    parseAsync(json: string) {
      return new Promise((resolve, reject) => {
        let task = Task.once(
          path.join(__dirname, "../Process/JSONParser.js"),
          json,
        );
        task.on("json:success", jsonObject => {
          resolve(jsonObject);
        });
        task.on("json:error", error => {
          reject(error);
        });
      });
    },
  },
  fs: {
    getTmpPath(fileName: string): string {
      return path.join(getTmpAppPluginFolder(), fileName);
    },
  },
};

export type HelperApi = {
  outputToHTML: (output: string) => string,
  json: {
    parseAsync: (json: string) => Promise<Object>,
  },
  fs: {
    getTmpPath: (fileName: string) => string,
  },
};
