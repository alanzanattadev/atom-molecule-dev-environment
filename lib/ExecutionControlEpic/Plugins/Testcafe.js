"use babel";
// @flow

import type {
  Directory,
  PlanConfig,
} from "../PlanConfigurationFeature/Types/types";
import type { TaskAPI } from "../LanguageServerProtocolFeature/Types/pluginApi";
import path from "path";
import moment from "moment";
import type { HelperAPI } from "../TaskExecutionFeature/Types/types";
import type { PackageTesterResult } from "../../ProjectSystemEpic/PackageFeature/Types/types";
import fs from "fs";
import type { Plugin } from "../DevtoolLoadingFeature/Types/types";

const plugin: Plugin = {
  info: {
    name: "testcafe",
    iconUri: "atom://molecule/images/plugins/testcafe.png",
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
      browser: {
        type: "conditional",
        expression: {
          type: "enum",
          label: "browser",
          default: "default",
          enum: [
            { value: "default", description: "-- choose browser --" },
            { value: "chrome", description: "chrome" },
            { value: "all", description: "all" },
            { value: "firefox", description: "firefox" },
            { value: "safari", description: "safari" },
          ],
        },
        cases: {
          default: null,
          chrome: {
            type: "array",
            items: {
              type: "enum",
              lbael: "browser",
              default: "chrome",
              enum: [
                { value: "chrome", description: "chrome" },
                { value: "firefox", description: "firefox" },
                { value: "safari", description: "safari" },
              ],
            },
          },
          all: null,
          firefox: {
            type: "array",
            items: {
              type: "enum",
              label: "browser",
              default: "firefox",
              enum: [
                { value: "chrome", description: "chrome" },
                { value: "firefox", description: "firefox" },
                { value: "safari", description: "safari" },
              ],
            },
          },
          safari: {
            type: "array",
            items: {
              type: "enum",
              label: "browser",
              default: "safari",
              enum: [
                { value: "chrome", description: "chrome" },
                { value: "firefox", description: "firefox" },
                { value: "safari", description: "safari" },
              ],
            },
          },
        },
      },
      testFile: {
        type: "string",
        label: "test file",
        default: "",
        placeholder: "exemple/test",
      },
      testFileArray: {
        type: "array",
        items: {
          type: "string",
          label: "test file",
          default: "",
          placeholder: "exemple/test",
        },
      },
    },
  },
  getStrategyForPlan(plan: PlanConfig, helperAPI: HelperAPI) {
    let binaryPath;
    const browsers = plan.config.browser.caseValue;
    const browser = plan.config.browser.expressionValue;
    const browserList = `${browser}${(browsers || [])
      .map(b => `,${b}`)
      .join("")}`;
    const files = `${plan.config.testFile} ${plan.config.testFileArray.join(
      " ",
    )}`;
    if (plan.config.binary === "local") {
      binaryPath = `${path.join(
        path.dirname(plan.packageInfo.path),
        "node_modules",
        ".bin",
        "testcafe",
      )}`;
    } else binaryPath = "testcafe";
    const cmd = `${binaryPath} ${browserList} ${files} --reporter json`;
    return {
      strategy: {
        type: "terminal",
        command: cmd,
        cwd: path.dirname(plan.packageInfo.path),
      },
      controller: {
        onData(data: string, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
          taskAPI.cache.push(data.toString());
        },
        onExit(code: number, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
          helperAPI.json
            .parseAsync(
              taskAPI.cache
                .get()
                .map(blob => blob.data)
                .join(""),
            )
            .then(json => {
              let getMessageForDiagnostic = (message): string => {
                if ("error" in message) {
                  return `Fixture: ${message.fixtureName} (${
                    message.fixturePath
                  })\n\tTest: ${message.testName}\n${message.error}`;
                } else {
                  return `Fixture: ${message.fixtureName} (${
                    message.fixturePath
                  })\n\tTest: ${message.testName}`;
                }
              };
              let getSeverityForDiagnostic = (type): number => {
                if ("error" in type) {
                  return helperAPI.severity.error;
                } else {
                  return helperAPI.severity.success;
                }
              };
              if (json.fixtures) {
                const diagnostics = json.fixtures
                  .map(fixture =>
                    fixture.tests
                      .map(test => {
                        if (test.errs.length > 0) {
                          return test.errs.map(err => ({
                            error: err,
                            testName: test.name,
                            fixtureName: fixture.name,
                            fixturePath: fixture.path,
                          }));
                        } else {
                          return [
                            {
                              name: test.name,
                              fixtureName: fixture.name,
                              fixturePath: fixture.path,
                            },
                          ];
                        }
                      })
                      .reduce((red, value) => red.concat(value), []),
                  )
                  .reduce((red, value) => red.concat(value), [])
                  .map(diagnostic => ({
                    range: {
                      start: { line: -1, character: -1 },
                      end: { line: -1, character: -1 },
                    },
                    severity: getSeverityForDiagnostic(diagnostic),
                    date: moment().unix(),
                    message: getMessageForDiagnostic(diagnostic),
                  }));
                taskAPI.diagnostics.setForPath({
                  uri: "testcafe",
                  diagnostics,
                });
              }
            });
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
          taskAPI.diagnostics.setForWorkspace({
            uri: "testcafe",
            diagnostics: [
              {
                range: {
                  start: { line: -1, character: -1 },
                  end: { line: -1, character: -1 },
                },
                severity: 1,
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
            "testcafe",
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
