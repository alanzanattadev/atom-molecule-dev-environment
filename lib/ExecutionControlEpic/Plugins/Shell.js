"use babel";
// @flow

import type { PlanConfig } from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js.flow";
import path from "path";
import moment from "moment";
import type { HelperApi } from "../TaskExecutionFeature/Model/HelperApi";

export default {
  info: {
    name: "shell",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-term.png",
  },
  configSchema: {
    type: "object",
    schemas: {
      command: {
        type: "string",
        label: "Command",
        placeholder: "ex: rm -rf,cp,...",
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
  getStrategyForPlan(plan: PlanConfig, helperAPI: HelperApi) {
    const env = plan.config.environmentVariables.reduce(function(
      env: any,
      varDeclaration: string,
    ) {
      let split = varDeclaration.split("=");
      return { ...env, [split[0]]: split[1] };
    },
    process.env);

    return {
      strategy: {
        type: "terminal",
        command: `${plan.config.command}`,
        cwd: plan.packageInfo.path,
        env: env,
      },
      controller: {
        onData(data: string, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.diagnostics.setForWorkspace({
            uri: plan.packageInfo.path,
            diagnostics: [
              {
                severity: helperAPI.severity.info,
                message: helperAPI.outputToHTML(data.toString()),
                date: moment().unix(),
              },
            ],
          });
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.diagnostics.setForWorkspace({
            uri: "shell",
            diagnostics: [
              {
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
  isPackage: (packageName: string, dirname: string) => {
    if (path.basename(packageName).indexOf(".sh") !== -1) {
      return {
        name: path.basename(path.dirname(packageName)) + "/",
        path: path.basename(packageName),
        type: "directory",
      };
    } else if (
      path.basename(packageName).indexOf(".git") !== -1 &&
      path.basename(packageName).indexOf(".gitignore") === -1
    ) {
      return {
        name: path.basename(path.dirname(packageName)) + "/",
        path: path.dirname(packageName),
        type: "directory",
      };
    } else {
      return false;
    }
  },
};
