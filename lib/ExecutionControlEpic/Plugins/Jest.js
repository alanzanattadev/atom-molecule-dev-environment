"use babel";
// @flow

import type { PlanConfig } from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js.flow";
import moment from "moment";
import path from "path";
import { File } from "atom";
import type { HelperApi } from "../TaskExecutionFeature/Model/HelperApi";
import fs from "fs";

function getOutputFilePath(planName: string, helperAPI: HelperApi): string {
  return helperAPI.fs.getTmpPath(`jest-${planName}.output.json`);
}

export default {
  infos: {
    name: "jest",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-jest.png",
  },
  configSchema: {
    type: "object",
    schemas: {
      configFile: {
        type: "file",
        label: "configfile",
        default: "",
        tester: (packagePath: string, dirname: string) =>
          path.basename(packagePath).indexOf("jest.") !== -1,
      },
      modifiedOnly: {
        type: "boolean",
        label: "only modified files (must be in a Git repo)",
        default: false,
      },
      watch: {
        type: "boolean",
        label: "Watch mode",
        default: true,
      },
      binary: {
        type: "conditional",
        expression: {
          type: "enum",
          label: "binary",
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
      environmentVariables: {
        type: "array",
        label: "Environment Variables",
        items: {
          type: "string",
          default: "",
          label: "Variable",
          placeholder: "NAME=value",
        },
      },
    },
  },
  getStrategyForPlan(plan: PlanConfig, helperApi: HelperApi) {
    let binaryPath;
    if (plan.config.binary.expressionValue === "local")
      binaryPath = `${path.join(
        path.dirname(plan.packageInfos.path),
        "node_modules",
        ".bin",
        "jest",
      )}`;
    else binaryPath = "jest";

    let command = `${binaryPath} --json --useStderr --silent --outputFile ${getOutputFilePath(
      plan.name,
      helperApi,
    )}`;
    command = `${command} ${plan.config.modifiedOnly ? `-o` : ""}`;
    command = `${command} ${plan.config.configFile !== "-- Not Selected --"
      ? `--config ${plan.config.configfile}`
      : ""}`;
    command = `${command} ${plan.config.watch ? "--watch" : ""}`;

    let env = plan.config.environmentVariables.reduce(function(
      env: any,
      varDeclaration: string,
    ) {
      let split = varDeclaration.split("=");
      return { ...env, [split[0]]: split[1] };
    }, process.env);

    return {
      strategy: {
        type: "shell",
        command: command,
        cwd: path.dirname(plan.packageInfos.path),
        env: env,
      },
      controller: {
        onData(data: string, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          if (this.nextStepAtNextData === true) {
            taskAPI.nextStep();
            this.nextStepAtNextData = false;
          }
          if (data.toString().indexOf("Ran all test suites") !== -1) {
            this.nextStepAtNextData = true;
            fs.readFile(
              `${getOutputFilePath(plan.name, helperAPI)}`,
              (err, json) => {
                if (!err) {
                  helperAPI.json.parseAsync(json.toString()).then(json => {
                    json.testResults.forEach(suite => {
                      if (suite.status === "passed") {
                        taskAPI.addDiagnostics([
                          {
                            type: "success",
                            message: {
                              text: helperAPI.outputToHTML(
                                `${suite.name.replace(
                                  path.dirname(plan.packageInfos.path),
                                  "",
                                )} :${"\n"}${suite.assertionResults
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
                                `${suite.name.replace(
                                  path.dirname(plan.packageInfos.path),
                                  "",
                                )}${"\n"}${suite.message}`,
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
              },
            );
          }
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
  isPackage: (packageName: string, dirname: string) => {
    if (path.basename(packageName) === "package.json") {
      const check = new File(
        path.join(
          packageName.slice(
            0,
            packageName.lastIndexOf(path.basename(packageName)),
          ),
          "node_modules",
          "jest",
        ),
      );
      return check.exists();
    } else {
      return false;
    }
  },
};
