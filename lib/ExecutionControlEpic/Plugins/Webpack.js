"use babel";
// @flow

import type {
  PlanConfig
} from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js";
import moment from "moment";
import path from "path";

export default {
  infos: {
    name: "webpack",
    iconUri: "atom://molecule-dev-environment/.storybook/public/devtool-icon-webpack.svg"
  },
  configSchema: {
    type: "conditional",
    expression: {
      type: "enum",
      enum: [
        { value: "standalone", description: "standalone (in node)" },
        { value: "external", description: "external (with api)" }
      ]
    },
    cases: {
      standalone: {
        type: "object",
        schemas: {
          script: {
            type: "string",
            default: "serve",
            title: "script",
            placeholder: "script"
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
                  placeholder: "name"
                },
                value: {
                  type: "string",
                  title: "value",
                  placeholder: "value"
                }
              }
            }
          }
        }
      },
      external: null
    }
  },
  getStrategyForPlan(plan: PlanConfig) {
    if (plan.config.expressionValue == "standalone") {
      return {
        strategy: {
          type: "shell",
          command: `${plan.config.caseValue.env
            .map(varAttr => `${varAttr.name}=${varAttr.value}`)
            .join(" ")} npm run ${plan.config.caseValue.script}`.trim(),
          cwd: path.dirname(plan.packageInfos.path)
        },
        controller: {
          onStdoutData(data: string, taskAPI: TaskAPI, helperAPI): void {
            let outputString = data.toString();
            let regexp = /(WARNING|ERROR)(.|\n)*\@.*(\n|$)/gm;
            let matching = outputString.match(regexp);
            if (matching && matching.length > 0) {
              if (matching[0].startsWith("WARNING")) {
                taskAPI.addDiagnostics([
                  {
                    type: "warning",
                    message: {
                      text: helperAPI.outputToHTML(matching[0]),
                      html: true
                    },
                    date: moment().unix()
                  }
                ]);
              } else {
                taskAPI.addDiagnostics([
                  {
                    type: "error",
                    message: {
                      text: helperAPI.outputToHTML(matching[0]),
                      html: true
                    },
                    date: moment().unix()
                  }
                ]);
              }
            }
            if (outputString.slice(0, 25).includes("webpack building..."))
              taskAPI.nextStep();
            taskAPI.addDiagnostics([
              {
                type: "info",
                message: {
                  text: helperAPI.outputToHTML(outputString),
                  html: true
                },
                date: moment().unix()
              }
            ]);
          },
          onStderrData(data: string, taskAPI: TaskAPI, helperAPI): void {
            taskAPI.addDiagnostics([
              {
                type: "info",
                message: {
                  text: helperAPI.outputToHTML(data.toString()),
                  html: true
                },
                date: moment().unix()
              }
            ]);
          },
          onExit(code: number, taskAPI: TaskAPI, helperAPI): void {},
          onError(err: any, taskAPI: TaskAPI, helperAPI): void {
            taskAPI.addDiagnostics([
              {
                type: "error",
                message: {
                  data: err
                },
                date: moment().unix()
              }
            ]);
          }
        }
      };
    } else {
      return {
        strategy: {
          type: "node",
          command: `nightwatch --env ${plan.config.env}`
        },
        controller: {
          onStdoutData(data: string, taskAPI: TaskAPI, helperAPI): void {},
          onStderrData(data: string, taskAPI: TaskAPI, helperAPI): void {},
          onExit(code: number, taskAPI: TaskAPI, helperAPI): void {},
          onError(err: any, taskAPI: TaskAPI, helperAPI): void {}
        }
      };
    }
  },
  isPackage: (packageName, dirname) =>
    (path.basename(packageName).indexOf("webpack.") != -1 ||
      path.basename(packageName).indexOf(".config.") != -1) &&
      path.basename(packageName).endsWith(".js") ||
      path.basename(packageName) == "package.json"
};
