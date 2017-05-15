"use babel";
// @flow

import type {
  PlanConfig,
} from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js.flow";
import moment from "moment";
import path from "path";
import type { HelperApi } from "../TaskExecutionFeature/Model/HelperApi";

export default {
  infos: {
    name: "npm",
    iconUri: "atom://molecule-dev-environment/.storybook/public/devtool-icon-npm.png",
  },
  configSchema: {
    type: "conditional",
    default: "start",
    expression: {
      type: "enum",
      enum: [
        { value: "run", description: "run" },
        { value: "start", description: "start" },
        { value: "test", description: "test" },
      ],
    },
    cases: {
      run: {
        type: "string",
        default: "",
        title: "script",
        placeholder: "script",
      },
      start: null,
      test: null,
    },
  },
  getStrategyForPlan(plan: PlanConfig) {
    let command;
    if (plan.config.expressionValue == "run")
      command = `npm run ${plan.config.caseValue}`;
    else if (plan.config.expressionValue == "test") command = "npm test";
    else command = "npm start";
    return {
      strategy: {
        type: "shell",
        command: command,
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
  isPackage: "package.json",
};
