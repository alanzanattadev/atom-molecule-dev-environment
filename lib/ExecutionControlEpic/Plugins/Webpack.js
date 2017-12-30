"use babel";
// @flow

import type { PlanConfig } from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js.flow";
import moment from "moment";
import path from "path";
import { File } from "atom";
import type { HelperApi } from "../TaskExecutionFeature/Model/HelperApi";

export default {
  infos: {
    name: "webpack",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-webpack.png",
  },
  configSchema: {
    type: "conditional",
    expression: {
      type: "enum",
      label: "mode",
      enum: [
        { value: "standalone", description: "standalone (in node)" },
        { value: "external", description: "external (with api)" },
      ],
    },
    cases: {
      standalone: {
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
              placeholder: "NAME=value",
            },
          },
        },
      },
      external: null,
    },
  },
  getStrategyForPlan(plan: PlanConfig, helperAPI: HelperApi) {
    if (plan.config.expressionValue === "standalone") {
      let step = 0;

      const env = plan.config.caseValue.environmentVariables.reduce(function(
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
          command: `npm run ${plan.config.caseValue.script}`.trim(),
          cwd: path.dirname(plan.packageInfos.path),
          env: env,
        },
        controller: {
          onData(data: string, taskAPI: TaskAPI, helperAPI: HelperApi): void {
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
                  taskAPI.addDiagnostics({
                    uri: "webpack",
                    diagnostics: [
                      {
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
            taskAPI.addDiagnostics({
              uri: "webpack",
              diagnostics: [
                {
                  severity: helperAPI.severity.info,
                  message: helperAPI.outputToHTML(outputString),
                  date: moment().unix(),
                },
              ],
            });
          },
          onError(err: any, taskAPI: TaskAPI, helperAPI: HelperApi): void {
            taskAPI.addDiagnostics({
              uri: "webpack",
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
    }
  },
  isPackage: (packageName: string, dirname: string) => {
    if (path.basename(packageName) === "package.json") {
      const check = new File(
        path.join(
          packageName.slice(
            0,
            packageName.lastIndexOf(path.basename(packageName)),
          ),
          "node_modules",
          "webpack",
        ),
      );
      return check.exists();
    } else {
      return false;
    }
  },
};
