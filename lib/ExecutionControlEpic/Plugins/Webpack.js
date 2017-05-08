"use babel";
// @flow

import type {
  PlanConfig,
} from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js";
import moment from "moment";
import path from "path";
import type { HelperApi } from "../TaskExecutionFeature/Model/HelperApi";

export default {
  infos: {
    name: "webpack",
    iconUri: "atom://molecule-dev-environment/.storybook/public/devtool-icon-webpack.png",
  },
  configSchema: {
    type: "conditional",
    expression: {
      type: "enum",
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
            title: "script",
            placeholder: "script",
          },
          env: {
            type: "array",
            title: "env",
            items: {
              type: "object",
              title: "variable",
              schemas: {
                name: {
                  type: "string",
                  title: "name",
                  placeholder: "name",
                },
                value: {
                  type: "string",
                  title: "value",
                  placeholder: "value",
                },
              },
            },
          },
        },
      },
      external: null,
    },
  },
  getStrategyForPlan(plan: PlanConfig) {
    if (plan.config.expressionValue === "standalone") {
      let step = 0;
      return {
        strategy: {
          type: "shell",
          command: `${plan.config.caseValue.env
            .map(varAttr => `${varAttr.name}=${varAttr.value}`)
            .join(" ")} npm run ${plan.config.caseValue.script}`.trim(),
          cwd: path.dirname(plan.packageInfos.path),
        },
        controller: {
          onData(data: string, taskAPI: TaskAPI, helperAPI: HelperApi): void {
            let outputString = data.toString();
            if (outputString.match(/(starting|building|compiling)/gi)) {
              taskAPI.nextStep();
              step += 1;
            }
            if (!outputString.endsWith("\n")) {
              taskAPI.cache.push(outputString, true);
            } else {
              let concatCache = taskAPI.cache
                .get({ step: step, excludeNullStep: true })
                .map(blob => blob.data)
                .join("")
                .concat(outputString);
              let regexp = /^\s+(WARNING|ERROR)(.|\s)*?(\@.*$)/gim;
              let matching = concatCache.match(regexp);
              if (matching && matching.length > 0) {
                matching.map(match => {
                  taskAPI.addDiagnostics([
                    {
                      type: match.match(/\s?warning\s?/gi)
                        ? "warning"
                        : "error",
                      message: {
                        text: helperAPI.outputToHTML(match),
                        html: true,
                      },
                      date: moment().unix(),
                    },
                  ]);
                });
              }
            }
            taskAPI.addDiagnostics([
              {
                type: "info",
                message: {
                  text: helperAPI.outputToHTML(outputString),
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
    }
  },
  isPackage: (packageName: string, dirname: string) =>
    ((path.basename(packageName).indexOf("webpack.") !== -1 ||
      path.basename(packageName).indexOf(".config.") !== -1) &&
      path.basename(packageName).endsWith(".js")) ||
    path.basename(packageName) === "package.json",
};
