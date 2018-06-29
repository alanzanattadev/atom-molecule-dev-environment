"use babel";
// @flow

import type { PlanConfig } from "../PlanConfigurationFeature/Types/types";
import moment from "moment";
import path from "path";
import type { HelperAPI } from "../TaskExecutionFeature/Types/types";
import type { TaskAPI } from "../LanguageServerProtocolFeature/Types/pluginApi";
import type { Plugin } from "../DevtoolLoadingFeature/Types/types";

const plugin: Plugin = {
  info: {
    name: "gulp",
    iconUri: "atom://molecule/.storybook/public/devtool-icon-gulp.png",
  },
  configSchema: {
    type: "object",
    schemas: {
      task: {
        type: "string",
        default: "",
        label: "task",
        placeholder: "task",
      },
      binary: {
        type: "enum",
        label: "binary",
        default: "local",
        enum: [
          { value: "local", description: "local" },
          { value: "global", description: "global" },
        ],
      },
    },
  },
  getStrategyForPlan(plan: PlanConfig, helperAPI: HelperAPI) {
    let binaryPath;
    if (plan.config.binary === "local")
      binaryPath = `${path.join(
        path.dirname(plan.packageInfo.path),
        "node_modules",
        ".bin",
        "gulp",
      )}`;
    else binaryPath = "gulp";
    return {
      strategy: {
        type: "terminal",
        command: `${binaryPath} ${plan.config.task}`,
        cwd: path.dirname(plan.packageInfo.path),
      },
      controller: {
        onData(data: string, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
          taskAPI.diagnostics.setForWorkspace({
            uri: "gulp",
            diagnostics: [
              {
                range: {
                  start: { line: -1, character: -1 },
                  end: { line: -1, character: -1 },
                },
                severity: helperAPI.severity.info,
                message: data.toString(),
                date: moment().unix(),
              },
            ],
          });
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
          taskAPI.diagnostics.setForWorkspace({
            uri: "gulp",
            diagnostics: [
              {
                range: {
                  start: { line: -1, character: -1 },
                  end: { line: -1, character: -1 },
                },
                severity: helperAPI.severity.error,
                message: err,
                date: moment().unix(),
              },
            ],
          });
        },
      },
    };
  },
  isPackage: "gulpfile.js",
};

export default plugin;
