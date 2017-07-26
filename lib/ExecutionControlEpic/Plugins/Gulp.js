"use babel";
// @flow

import type { PlanConfig } from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js.flow";
import moment from "moment";
import path from "path";
import type { HelperApi } from "../TaskExecutionFeature/Model/HelperApi";

export default {
  infos: {
    name: "gulp",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-gulp.png",
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
        type: "conditional",
        expression: {
          type: "enum",
          label: "binary",
          enum: [
            { value: "local", description: "local" },
            { value: "global", description: "global" },
          ],
        },
        cases: {
          local: null,
          global: null,
        },
      },
    },
  },
  getStrategyForPlan(plan: PlanConfig) {
    let binaryPath;
    if (plan.config.binary.expressionValue == "local")
      binaryPath = `${path.join(
        path.dirname(plan.packageInfos.path),
        "node_modules",
        ".bin",
        "gulp",
      )}`;
    else binaryPath = "gulp";
    return {
      strategy: {
        type: "terminal",
        command: `${binaryPath} ${plan.config.task}`,
        cwd: path.dirname(plan.packageInfos.path),
      },
      controller: {
        onData(data: string, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.addDiagnostics([
            {
              type: "info",
              message: {
                text: helperAPI.outputToHTML(data.toString()),
                html: true,
              },
              date: moment().unix(),
            },
          ]);
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.addDiagnostics([
            {
              type: "error",
              message: {
                data: err,
              },
              date: moment().unix(),
            },
          ]);
        },
      },
    };
  },
  isPackage: "gulpfile.js",
};
