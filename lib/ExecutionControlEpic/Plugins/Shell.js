"use babel";
// @flow

import type {
  Directory,
  PlanConfig,
} from "../PlanConfigurationFeature/Types/types";
import path from "path";
import moment from "moment";
import type { HelperAPI } from "../TaskExecutionFeature/Types/types";
import type { TaskAPI } from "../LanguageServerProtocolFeature/Types/pluginApi";
import type { PackageTesterResult } from "../../ProjectSystemEpic/PackageFeature/Types/types";
import type { Plugin } from "../DevtoolLoadingFeature/Types/types";

const plugin: Plugin = {
  info: {
    name: "shell",
    dominantColor: "#303030",
    iconUri: "atom://molecule/images/plugins/shell.png",
  },
  configSchema: {
    type: "object",
    schemas: {
      command: {
        type: "string",
        label: "Command",
        default: "",
        placeholder: "ex: rm -rf,cp,...",
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
  getStrategyForPlan(plan: PlanConfig, helperAPI: HelperAPI) {
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
        onData(data: string, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
          taskAPI.diagnostics.setForWorkspace({
            uri: plan.packageInfo.path,
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
            uri: "shell",
            diagnostics: [
              {
                range: {
                  start: { line: -1, character: -1 },
                  end: { line: -1, character: -1 },
                },
                severity: helperAPI.severity.error,
                message: `Error: ${err.code | 1}`.toString(),
                date: moment().unix(),
              },
            ],
          });
        },
      },
    };
  },
  isPackage: (
    packagePath: string,
    directory: ?Directory,
  ): PackageTesterResult => {
    if (path.basename(packagePath).indexOf(".sh") !== -1) {
      return {
        name: path.basename(path.dirname(packagePath)) + "/",
        path: path.basename(packagePath),
        type: "directory",
      };
    } else if (
      path.basename(packagePath).indexOf(".git") !== -1 &&
      path.basename(packagePath).indexOf(".gitignore") === -1
    ) {
      return {
        name: path.basename(path.dirname(packagePath)),
        path: path.dirname(packagePath),
        type: "directory",
      };
    } else {
      return false;
    }
  },
};

export default plugin;
