"use babel";
// @flow

import React from "react";
import type {
  PlanConfig,
} from "../../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../../DevtoolLoadingFeature/Types/types.js.flow";
import moment from "moment";
import path from "path";
import type { HelperApi } from "../../TaskExecutionFeature/Model/HelperApi";
import FlowDiagnostic from "./Presenters/FlowDiagnostic.js";

export default {
  infos: {
    name: "flow",
    iconUri: "atom://molecule-dev-environment/.storybook/public/devtool-icon-flow.png",
  },
  configSchema: {
    type: "object",
    schemas: {
      conf: {
        type: "conditional",
        expression: {
          type: "enum",
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
              enum: [
                { value: "start", description: "start" },
                { value: "stop", description: "stop" },
              ],
            },
            cases: {
              start: {
                type: "boolean",
                default: false,
                title: "check files at server start",
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
    if (plan.config.binary.expressionValue == "local")
      binaryPath = `${path.join(path.dirname(plan.packageInfos.path), "node_modules", ".bin", "flow")}`;
    else binaryPath = "flow";
    if (plan.config.conf.expressionValue == "server") {
      cmd = `${binaryPath} ${plan.config.conf.caseValue.expressionValue == "start" ? plan.config.conf.caseValue.caseValue ? "--quiet --json --strip-root" : "start" : "stop"}`;
    } else {
      cmd = `${binaryPath} status --no-auto-start --json --strip-root`;
    }
    return {
      strategy: {
        type: "shell",
        command: cmd,
        cwd: path.dirname(plan.packageInfos.path),
      },
      controller: {
        onStdoutData(
          data: string,
          taskAPI: TaskAPI,
          helperAPI: HelperApi,
        ): void {
          taskAPI.cache.push(data.toString());
        },
        onStderrData(
          data: string,
          taskAPI: TaskAPI,
          helperAPI: HelperApi,
        ): void {
          taskAPI.addDiagnostics([
            {
              type: "info",
              message: {
                text: helperAPI.outputToHTML(data.toString()),
                html: true,
              },
              date: moment().unix(),
            },
          ]);
        },
        onExit(code: number, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          helperAPI.json
            .parseAsync(taskAPI.cache.get().map(blob => blob.data).join(""))
            .then(json => {
              taskAPI.addDiagnostics(
                (json.errors || [])
                  .map(err => ({
                    type: "error",
                    message: function FlowDiagnosticErr() {
                      return <FlowDiagnostic log={err} />;
                    },
                    date: moment().unix(),
                    location: err.message.reduce(
                      (red, value) =>
                        (red === null && value.loc
                          ? {
                              path: value.loc.source,
                              line: value.loc.start.line,
                              column: value.loc.start.column,
                            }
                          : red),
                      null,
                    ),
                  }))
                  .concat(
                    (json.warnings || []).map(warn => ({
                      type: "warning",
                      message: function FlowDiagnosticWarn() {
                        return <FlowDiagnostic log={warn} />;
                      },
                      date: moment().unix(),
                      location: warn.message.reduce(
                        (red, value) =>
                          (red === null && value.loc
                            ? {
                                path: value.loc.source,
                                line: value.loc.start.line,
                                column: value.loc.start.column,
                              }
                            : red),
                        null,
                      ),
                    })),
                  ),
              );
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
  isPackage: ".flowconfig",
};
