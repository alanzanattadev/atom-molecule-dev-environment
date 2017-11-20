"use babel";
// @flow

import type { PlanConfig } from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js.flow";
import moment from "moment";
import path from "path";
import type { HelperApi } from "../TaskExecutionFeature/Model/HelperApi";

export default {
  infos: {
    name: "npm",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-npm.png",
  },
  configSchema: {
    type: "conditional",
    default: "start",
    expression: {
      type: "enum",
      label: "command",
      enum: [
        { value: "run", description: "run" },
        { value: "start", description: "start" },
        { value: "test", description: "test" },
      ],
    },
    cases: {
      run: {
        type: "object",
        schemas: {
          script: {
            type: "string",
            default: "",
            label: "script",
            placeholder: "script",
          },
          environmentVariables: {
            type: "array",
            label: "Environment Variables",
            items: {
              type: "string",
              label: "Variable",
              placeholder: "NAME=value",
            },
          },
        },
      },
      start: null,
      test: null,
    },
  },
  getStrategyForPlan(plan: PlanConfig) {
    let command;
    let env = process.env;

    if (plan.config.expressionValue === "run") {
      command = `npm run ${plan.config.caseValue.script}`;
      env = plan.config.caseValue.environmentVariables.reduce(function(
        env: any,
        varDeclaration: string,
      ) {
        let split = varDeclaration.split("=");
        return { ...env, [split[0]]: split[1] };
      },
      process.env);
    } else if (plan.config.expressionValue === "test") {
      command = command = "npm test";
    } else {
      command = command = "npm start";
    }
    return {
      strategy: {
        type: "terminal",
        command: command,
        cwd: path.dirname(plan.packageInfos.path),
        env: env,
      },
      controller: {
        onData(data: string, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.addDiagnostics({
            uri: "npm",
            diagnostics: [
              {
                severity: 3,
                message: helperAPI.outputToHTML(data.toString()),
                date: moment().unix(),
              },
            ],
          });
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.addDiagnostics({
            uri: "npm",
            diagnostics: [
              {
                severity: 1,
                message: err,
                date: moment().unix(),
              },
            ],
          });
        },
      },
    };
  },
  isPackage: "package.json",
};
