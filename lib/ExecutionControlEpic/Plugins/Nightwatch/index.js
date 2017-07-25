"use babel";
// @flow

import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../../DevtoolLoadingFeature/Types/types.js.flow";
import path from "path";
import { File } from "atom";
import moment from "moment";
import type { HelperApi } from "../../TaskExecutionFeature/Model/HelperApi";
import fs from "fs";

export default {
  infos: {
    name: "nightwatch",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-nightwatch.png",
  },
  configSchema: {
    type: "object",
    schemas: {
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
      sources: {
        type: "object",
        schemas: {
          source: {
            type: "string",
            label: "source",
            placeholder: "exemple/test/",
          },
          sourcearray: {
            type: "array",
            items: {
              type: "string",
              label: "source",
              placeholder: "exemple/test/",
            },
          },
        },
      },
      env: {
        type: "string",
        label: "env",
        default: "default",
        placeholder: "env",
      },
    },
  },
  getStrategyForPlan(plan: PlanConfig) {
    let binaryPath;
    const sources = `${plan.config.sources
      .source} ${plan.config.sources.sourcearray.join(" ")}`;
    if (plan.config.binary.expressionValue === "local") {
      binaryPath = `${path.join(
        path.dirname(plan.packageInfos.path),
        "node_modules",
        ".bin",
        "nightwatch",
      )}`;
    } else binaryPath = "nightwatch";
    const cmd = `${binaryPath} ${sources} --reporter ${path.join(
      __dirname,
      "html-reporter.js",
    )} --env ${plan.config.env}`;
    return {
      strategy: {
        type: "shell",
        command: cmd,
        cwd: path.dirname(plan.packageInfos.path),
      },
      controller: {
        onExit(code: number, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          fs.readFile("/tmp/report-nightwatch.json", "utf8", function(
            err,
            data,
          ) {
            helperAPI.json.parseAsync(data.toString()).then(json => {
              let getMessageForDiagnostic = (m): string => {
                const type =
                  typeof m.failure === "string" ? "error" : "success";
                if (type === "error") {
                  return `At file ${m.filename} for test ${m.suite} \n${m.fullMsg}\n${m.stackTrace}`;
                } else {
                  return `At file ${m.filename} for test ${m.suite} \n${m.message}`;
                }
              };
              if (json.modules) {
                taskAPI.addDiagnostics(
                  Object.keys(json.modules)
                    .map(filename =>
                      Object.keys(json.modules[filename].completed || {})
                        .map(testName =>
                          json.modules[filename].completed[
                            testName
                          ].assertions.map(assertion =>
                            Object.assign({}, assertion, {
                              suite: testName,
                              filename,
                            }),
                          ),
                        )
                        .reduce((red, value) => red.concat(value), []),
                    )
                    .reduce((red, value) => red.concat(value), [])
                    .map(assertion => ({
                      type:
                        typeof assertion.failure === "string"
                          ? "error"
                          : "success",
                      message: {
                        text: getMessageForDiagnostic(assertion),
                      },
                      date: moment().unix(),
                    })),
                );
              }
            });
          });
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.addDiagnostics([
            {
              type: "error",
              message: { data: err },
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
          "nightwatch",
        ),
      );
      return check.exists();
    } else {
      return false;
    }
  },
};
