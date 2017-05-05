"use babel";
// @flow

import type {
  PlanConfig,
} from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js";
import moment from "moment";
import path from "path";
import type { HelperApi } from "../TaskExecutionFeature/Model/HelperApi";
import fs from "fs";

function getOutputFilePath(planName) {
  return path.join(path.sep, "tmp", `jest-${planName}.output.json`);
}

export default {
  infos: {
    name: "jest",
    iconUri: "atom://molecule-dev-environment/.storybook/public/devtool-icon-jest.png",
  },
  configSchema: {
    type: "object",
    schemas: {
      config: {
        type: "boolean",
        title: "only modified files (must be in a Git repo)",
        default: false,
      },
      watch: {
        type: "boolean",
        title: "Watch mode",
        default: true,
      },
      binary: {
        type: "conditional",
        expression: {
          type: "enum",
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
      binaryPath = `${path.join(path.dirname(plan.packageInfos.path), "node_modules", ".bin", "jest")}`;
    else binaryPath = "jest";
    return {
      strategy: {
        type: "shell",
        command: `${binaryPath} --json ${plan.config.config ? `-o` : ""} ${plan.packageInfos.path != "package.json" ? `--config ${plan.packageInfos.path}` : ""} --useStderr --silent ${plan.config.watch ? "--watch" : ""} --outputFile ${getOutputFilePath(plan.name)}`,
        cwd: path.dirname(plan.packageInfos.path),
      },
      controller: {
        onData(data: string, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          if (this.nextStepAtNextData === true) {
            taskAPI.nextStep();
            this.nextStepAtNextData = false;
          }
          if (data.toString().indexOf("Ran all test suites") != -1) {
            this.nextStepAtNextData = true;
            fs.readFile(`${getOutputFilePath(plan.name)}`, (err, json) => {
              if (!err) {
                helperAPI.json.parseAsync(json.toString()).then(json => {
                  json.testResults.forEach(suite => {
                    if (suite.status == "passed") {
                      taskAPI.addDiagnostics([
                        {
                          type: "success",
                          message: {
                            text: helperAPI.outputToHTML(
                              `${suite.name.replace(path.dirname(plan.packageInfos.path), "")} :${"\n"}${suite.assertionResults
                                .map(assertionResult => assertionResult.title)
                                .join("\n")}`,
                            ),
                            html: true,
                          },
                          date: moment(suite.endTime),
                        },
                      ]);
                    } else {
                      taskAPI.addDiagnostics([
                        {
                          type: "error",
                          message: {
                            text: helperAPI.outputToHTML(
                              `${suite.name.replace(path.dirname(plan.packageInfos.path), "")}${"\n"}${suite.message}`,
                            ),
                            html: true,
                          },
                          date: moment(suite.endTime),
                        },
                      ]);
                    }
                  });
                });
              }
            });
          }
          // taskAPI.addDiagnostics([
          //   {
          //     type: "info",
          //     message: {
          //       text: helperAPI.outputToHTML(data.toString()),
          //       html: true,
          //     },
          //     date: moment().unix(),
          //   },
          // ]);
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
  isPackage: (packagePath: string, dirname) =>
    path.basename(packagePath).indexOf("jest.config") != -1 ||
    path.basename(packagePath).indexOf(".jest.") != -1 ||
    path.basename(packagePath) == "package.json",
};
