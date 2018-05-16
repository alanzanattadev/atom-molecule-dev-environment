"use babel";
// @flow

import type {
  Directory,
  PlanConfig,
} from "../../PlanConfigurationFeature/Types/types";
import type { TaskAPI } from "../../LanguageServerProtocolFeature/Types/pluginApi";
import path from "path";
import moment from "moment";
import type { HelperAPI } from "../../TaskExecutionFeature/Types/types";
import fs from "fs";
import type { PackageTesterResult } from "../../../ProjectSystemEpic/PackageFeature/Types/types";
import type { Plugin } from "../../DevtoolLoadingFeature/Types/types";

const plugin: Plugin = {
  info: {
    name: "nightwatch",
    dominantColor: "#502D17",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-nightwatch.png",
  },
  configSchema: {
    type: "object",
    schemas: {
      binary: {
        type: "enum",
        label: "binary",
        default: "local",
        enum: [
          { value: "local", description: "local" },
          { value: "global", description: "global" },
        ],
      },
      sources: {
        type: "object",
        schemas: {
          source: {
            type: "string",
            label: "source",
            default: "",
            placeholder: "exemple/test/",
          },
          sourcearray: {
            type: "array",
            items: {
              type: "string",
              label: "source",
              default: "",
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
  getStrategyForPlan(plan: PlanConfig, helperAPI: HelperAPI) {
    let binaryPath;
    const sources = `${
      plan.config.sources.source
    } ${plan.config.sources.sourcearray.join(" ")}`;
    if (plan.config.binary === "local") {
      binaryPath = `${path.join(
        path.dirname(plan.packageInfo.path),
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
        type: "terminal",
        command: cmd,
        cwd: path.dirname(plan.packageInfo.path),
        env: process.env,
      },
      controller: {
        onExit(code: number, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
          fs.readFile("/tmp/report-nightwatch.json", "utf8", function(
            err,
            data,
          ) {
            helperAPI.json.parseAsync(data.toString()).then(json => {
              let getMessageForDiagnostic = (m): string => {
                const type =
                  typeof m.failure === "string" ? "error" : "success";
                if (type === "error") {
                  return `At file ${m.filename} for test ${m.suite} \n${
                    m.fullMsg
                  }\n${m.stackTrace}`;
                } else {
                  return `At file ${m.filename} for test ${m.suite} \n${
                    m.message
                  }`;
                }
              };
              if (json.modules) {
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
                  .map(assertion => {
                    taskAPI.diagnostics.setForWorkspace({
                      uri: assertion.filename || "nightwatch",
                      diagnostics: [
                        {
                          range: {
                            start: { line: -1, character: -1 },
                            end: { line: -1, character: -1 },
                          },
                          severity:
                            typeof assertion.failure === "string"
                              ? helperAPI.severity.error
                              : helperAPI.severity.success,
                          message: getMessageForDiagnostic(assertion),
                          date: moment().unix(),
                        },
                      ],
                    });
                  });
              }
            });
          });
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
          taskAPI.diagnostics.setForPath({
            uri: "nightwatch",
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
    packagePath: string,
    directory: ?Directory,
  ): PackageTesterResult => {
    if (path.basename(packagePath) === "package.json") {
      return new Promise(resolve =>
        fs.access(
          path.join(
            packagePath.slice(
              0,
              packagePath.lastIndexOf(path.basename(packagePath)),
            ),
            "node_modules",
            "nightwatch",
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
