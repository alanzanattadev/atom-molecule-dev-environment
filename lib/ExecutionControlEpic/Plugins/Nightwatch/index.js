"use babel";
// @flow
import type {
  PlanConfig
} from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js.flow";
import path from "path";
import moment from "moment";
import type { HelperApi } from '../../TaskExecutionFeature/Model/HelperApi';
import fs from "fs";

export default {
  infos: {
    name: "nightwatch",
    iconUri: "atom://molecule-dev-environment/.storybook/public/devtool-icon-nightwatch.png"
  },
  configSchema: {
    type: "object",
    schemas: {
      binary: {
        type: "conditional",
        expression: {
          type: "enum",
          enum: [
            { value: "local", description: "local" },
            { value: "global", description: "global" }
          ]
        },
        cases: {
          local: null,
          global: null
        }
      },
      sources: {
        type: "object",
        schemas: {
          source: {
            type: "string",
            title: "source",
            placeholder: "exemple/test/"
          },
          sourcearray: {
            type: "array",
            items: {
              type: "string",
              title: "source",
              placeholder: "exemple/test/"
            }
          }
        }
      },
      env: {
        type: "string",
        title: "env",
        default: "default",
        placeholder: "env"
      }
      // verbose: null,
      // test: null,
      // testcase: null,
      // group: null,
      // skipgroup: null,
      // filter: null,
      // tag: null,
      // skiptags: null,
      // retries: null,
      // suiteRetries: null
    }
  },
  getStrategyForPlan(plan: PlanConfig) {
    let binaryPath;
    const sources = `${plan.config.sources.source} ${plan.config.sources.sourcearray.join(
      " "
    )}`;
    if (plan.config.binary.expressionValue == "local") {
      binaryPath = `${path.join(
        path.dirname(plan.packageInfos.path),
        "node_modules",
        ".bin",
        "nightwatch"
      )}`;
    } else
      binaryPath = "nightwatch";
    const cmd = `${binaryPath} ${sources} --reporter ${path.join(
      __dirname,
      "html-reporter.js"
    )} --env ${plan.config.env}`;
    console.log(cmd);
    return {
      strategy: {
        type: "shell",
        command: cmd,
        cwd: path.dirname(plan.packageInfos.path)
      },
      controller: {
        onStdoutData(data: string, taskAPI: TaskAPI, helperAPI: HelperApi): void {
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
        onStderrData(data: string, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.addDiagnostics([
            {
              type: "error",
              message: {
                text: helperAPI.outputToHTML(data.toString()),
                html: true
              },
              date: moment().unix()
            }
          ]);
        },
        onExit(code: number, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          fs.readFile("/tmp/report-nightwatch.json", "utf8", function(
            err,
            data
          ) {
            if (err) return console.log(err);
            helperAPI.json.parseAsync(data.toString()).then(json => {
              let getMessageForDiagnostic = (m): string => {
                const type = typeof m.failure == "string" ? "error" : "success";
                if (type == "error") {
                  return `At file ${m.filename} for test ${m.suite} \n${m.fullMsg}\n${m.stackTrace}`;
                } else if (type == "success") {
                  return `At file ${m.filename} for test ${m.suite} \n${m.message}`;
                }
              };
              if (json.modules) {
                taskAPI.addDiagnostics(
                  Object.keys(json.modules)
                    .map(filename => Object
                      .keys(json.modules[filename].completed || {})
                      .map(testName => json.modules[filename].completed[
                        testName
                      ].assertions.map(assertion => Object.assign(
                        {},
                        assertion,
                        {
                          suite: testName,
                          filename
                        }
                      )))
                      .reduce((red, value) => red.concat(value), []))
                    .reduce((red, value) => red.concat(value), [])
                    .map(assertion => ({
                      type: typeof assertion.failure == "string"
                        ? "error"
                        : "success",
                      message: {
                        text: getMessageForDiagnostic(assertion)
                      },
                      date: moment().unix()
                    }))
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
              date: moment().unix()
            }
          ]);
        }
      }
    };
  },
  isPackage: "nightwatch.json"
};
