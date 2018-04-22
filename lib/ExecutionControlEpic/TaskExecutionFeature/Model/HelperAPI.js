"use babel";
// @flow

import ansiToHtml from "ansi-to-html";
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
    parseAsync(json: string): Promise<Object> {
      return new Promise((resolve, reject) => {
        resolve(JSON.parse(json));
      });
    },
  },
  fs: {
    getTmpPath(fileName: string): string {
      return path.join(getTmpAppPluginFolder(), fileName);
    },
  },
  severity: {
    error: 1,
    warning: 2,
    info: 3,
    hint: 4,
    success: 5,
  },
};
