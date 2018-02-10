"use babel";
// @flow

import moment from "moment";
import path from "path";
import type { PlanConfig } from "../PlanConfigurationFeature/Types/types";
import type { HelperAPI } from "../TaskExecutionFeature/Types/types";
import type { TaskAPI } from "../LanguageServerProtocolFeature/Types/pluginApi";
import type { Plugin } from "../DevtoolLoadingFeature/Types/types";

const plugin: Plugin = {
  info: {
    name: "npm",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-npm.png",
  },
  configSchema: {
    type: "conditional",
    expression: {
      type: "enum",
      label: "command",
      default: "run",
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
              default: "",
              placeholder: "NAME=value",
            },
          },
        },
      },
      start: null,
      test: null,
    },
  },
  getStrategyForPlan(plan: PlanConfig, helperAPI: HelperAPI) {
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
        cwd: path.dirname(plan.packageInfo.path),
        env: env,
      },
      controller: {
        onData(data: string, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
          taskAPI.diagnostics.setForWorkspace({
            uri: "npm",
            diagnostics: [
              {
                range: {
                  start: { line: -1, character: -1 },
                  end: { line: -1, character: -1 },
                },
                severity: helperAPI.severity.info,
                message: helperAPI.outputToHTML(data.toString()),
                date: moment().unix(),
              },
            ],
          });
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
          taskAPI.diagnostics.setForWorkspace({
            uri: "npm",
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
  isPackage: "package.json",
};

export default plugin;
