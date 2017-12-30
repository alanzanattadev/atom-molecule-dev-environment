"use babel";
// @flow

import ansiToHtml from "ansi-to-html";
import { fork } from "child_process";
import path from "path";
import { getTmpAppPluginFolder } from "../../../GlobalSystem/Model/fs";
import type {
  DiagnosticError,
  DiagnosticWarning,
  DiagnosticHint,
  DiagnosticInformation,
  DiagnosticSuccess,
} from "../../DiagnosticsFeature/Types/types.js";

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

export type HelperApi = {
  outputToHTML: (output: string) => string,
  json: {
    parseAsync: (json: string) => Promise<Object>,
  },
  fs: {
    getTmpPath: (fileName: string) => string,
  },
  severity: {
    error: DiagnosticError,
    warning: DiagnosticWarning,
    info: DiagnosticInformation,
    hint: DiagnosticHint,
    success: DiagnosticSuccess,
  },
};
