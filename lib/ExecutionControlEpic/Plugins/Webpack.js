"use babel";
// @flow

import type {
  Directory,
  PlanConfig,
} from "../PlanConfigurationFeature/Types/types";
import moment from "moment";
import path from "path";
import type { HelperAPI } from "../TaskExecutionFeature/Types/types";
import type { TaskAPI } from "../LanguageServerProtocolFeature/Types/pluginApi";
import type { PackageTesterResult } from "../../ProjectSystemEpic/PackageFeature/Types/types";
import fs from "fs";
import type { Plugin } from "../DevtoolLoadingFeature/Types/types";

const plugin: Plugin = {
  info: {
    name: "webpack",
    dominantColor: "#8ED5FA",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-webpack.png",
  },
  configSchema: {
    type: "object",
    schemas: {
      script: {
        type: "string",
        default: "serve",
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
  getStrategyForPlan(plan: PlanConfig, helperAPI: HelperAPI) {
    let step = 0;

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
        command: `npm run ${plan.config.script}`.trim(),
        cwd: path.dirname(plan.packageInfo.path),
        env: env,
      },
      controller: {
        onData(data: string, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
          let outputString = data.toString();
          if (outputString.match(/(started|starting|building|compiling)/gi)) {
            taskAPI.nextStep();
            taskAPI.busy.switchToBusyMode();
            step += 1;
          } else if (outputString.match(/(failed|completed)/gi)) {
            taskAPI.busy.switchToWaitingMode();
          }
          if (!outputString.endsWith("\n")) {
            taskAPI.cache.push(outputString, true);
          } else {
            let concatCache = taskAPI.cache
              .get({ step: step, excludeNullStep: true })
              .map(blob => blob.data)
              .join("")
              .concat(outputString);
            let regexp = /^\s+(WARNING|ERROR)(.|\s)*?(@.*$)/gim;
            let matching = concatCache.match(regexp);
            if (matching && matching.length > 0) {
              matching.map(match => {
                taskAPI.diagnostics.setForWorkspace({
                  uri: "webpack",
                  diagnostics: [
                    {
                      range: {
                        start: { line: -1, character: -1 },
                        end: { line: -1, character: -1 },
                      },
                      severity: match.match(/\s?warning\s?/gi)
                        ? helperAPI.severity.warning
                        : helperAPI.severity.error,
                      message: helperAPI.outputToHTML(match),
                      date: moment().unix(),
                    },
                  ],
                });
              });
            }
          }
          taskAPI.diagnostics.setForWorkspace({
            uri: "webpack",
            diagnostics: [
              {
                range: {
                  start: { line: -1, character: -1 },
                  end: { line: -1, character: -1 },
                },
                severity: helperAPI.severity.info,
                message: helperAPI.outputToHTML(outputString),
                date: moment().unix(),
              },
            ],
          });
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
          taskAPI.diagnostics.setForWorkspace({
            uri: "webpack",
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
  isPackage: (
    packageName: string,
    directory: ?Directory,
  ): PackageTesterResult => {
    if (path.basename(packageName) === "package.json") {
      return new Promise(resolve =>
        fs.access(
          path.join(
            packageName.slice(
              0,
              packageName.lastIndexOf(path.basename(packageName)),
            ),
            "node_modules",
            "webpack",
          ),
          fs.constants.F_OK,
          err => {
            if (err) resolve(false);
            else resolve(true);
          },
        ),
      );
    } else {
      return false;
    }
  },
};

export default plugin;
