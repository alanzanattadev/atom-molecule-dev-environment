"use babel";
// @flow

import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../../DevtoolLoadingFeature/Types/types.js.flow";
import moment from "moment";
import path from "path";
import type { HelperApi } from "../../TaskExecutionFeature/Model/HelperApi";
import FlowDiagnostic from "./Presenters/FlowDiagnostic.js";

export default {
  infos: {
    name: "flow",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-flow.png",
  },
  configSchema: {
    type: "object",
    schemas: {
      conf: {
        type: "conditional",
        expression: {
          type: "enum",
          label: "command",
          enum: [
            { value: "server", description: "server" },
            { value: "check", description: "status (check)" },
          ],
        },
        cases: {
          server: {
            type: "conditional",
            expression: {
              type: "enum",
              label: "action",
              enum: [
                { value: "start", description: "start" },
                { value: "stop", description: "stop" },
              ],
            },
            cases: {
              start: {
                type: "boolean",
                default: false,
                label: "check files at server start",
              },
              stop: {},
            },
          },
        },
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
    },
  },
  getStrategyForPlan(plan: PlanConfig) {
    let binaryPath;
    let cmd;
    const options = "--json --pretty --strip-root";

    if (plan.config.binary.expressionValue == "local")
      binaryPath = `${path.join(
        path.dirname(plan.packageInfos.path),
        "node_modules",
        ".bin",
        "flow",
      )}`;
    else binaryPath = "flow";

    if (plan.config.conf.expressionValue == "server") {
      if (plan.config.conf.caseValue.expressionValue == "start") {
        cmd = `${binaryPath} start`;
        if (plan.config.conf.caseValue.caseValue) {
          cmd = `${cmd} --quiet ${options}`;
        }
      } else {
        cmd = `${binaryPath} stop`;
      }
    } else {
      cmd = `${binaryPath} status --no-auto-start ${options}`;
    }

    return {
      strategy: {
        type: "terminal",
        command: cmd,
        cwd: path.dirname(plan.packageInfos.path),
      },
      controller: {
        onData(data: string, taskAPI: TaskAPI): void {
          taskAPI.cache.push(data.toString());
        },
        onExit(code: number, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          helperAPI.json
            .parseAsync(
              taskAPI.cache
                .get()
                .map(blob => blob.data)
                .join(""),
            )
            .then(json => {
              (json.errors || []).map(err =>
                taskAPI.addDiagnostics({
                  uri: err.message.reduce(
                    (red, val) =>
                      red === null && val.loc ? val.loc.source : red,
                    null,
                  ),
                  diagnostics: [
                    {
                      severity: helperAPI.severity.error,
                      message: err.message,
                      date: moment().unix(),
                      range: err.message.reduce(
                        (red, val) =>
                          red === null && val.loc
                            ? {
                                start: {
                                  character: val.loc.start.column,
                                  line: val.loc.start.line,
                                },
                                end: {
                                  character: val.loc.end.column,
                                  line: val.loc.end.line,
                                },
                              }
                            : red,
                        null,
                      ),
                    },
                  ],
                }),
              );
              (json.warnings || []).map(warn =>
                taskAPI.addDiagnostics({
                  uri: warn.message.reduce(
                    (red, val) =>
                      red === null && val.loc ? val.loc.source : red,
                    null,
                  ),
                  diagnostics: [
                    {
                      severity: helperAPI.severity.warning,
                      message: warn.message,
                      date: moment().unix(),
                      range: warn.message.reduce(
                        (red, val) =>
                          red === null && val.loc
                            ? {
                                start: {
                                  character: val.loc.start.column,
                                  line: val.loc.start.line,
                                },
                                end: {
                                  character: val.loc.end.column,
                                  line: val.loc.end.line,
                                },
                              }
                            : red,
                        null,
                      ),
                    },
                  ],
                }),
              );
            });
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.addDiagnostics({
            uri: "flowtype",
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
  DiagnosticView: FlowDiagnostic,
  isPackage: ".flowconfig",
};
