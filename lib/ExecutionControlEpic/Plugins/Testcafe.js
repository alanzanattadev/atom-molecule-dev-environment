"use babel";
// @flow

import type { PlanConfig } from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js.flow";
import path from "path";
import { File } from "atom";
import moment from "moment";
import type { HelperApi } from "../TaskExecutionFeature/Model/HelperApi";

export default {
  info: {
    name: "testcafe",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-testcafe.png",
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
      browser: {
        type: "conditional",
        expression: {
          type: "enum",
          label: "browser",
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
        placeholder: "exemple/test",
      },
      testFileArray: {
        type: "array",
        items: {
          type: "string",
          label: "test file",
          placeholder: "exemple/test",
        },
      },
    },
  },
  getStrategyForPlan(plan: PlanConfig, helperAPI: HelperApi) {
    let binaryPath;
    const browsers = plan.config.browser.caseValue;
    const browser = plan.config.browser.expressionValue;
    const browserList = `${browser}${(browsers || [])
      .map(b => `,${b}`)
      .join("")}`;
    const files = `${plan.config.testFile} ${plan.config.testFileArray.join(
      " ",
    )}`;
    if (plan.config.binary.expressionValue === "local") {
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
        onData(data: string, taskAPI: TaskAPI, helperAPI: HelperApi): void {
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
                    severity: getSeverityForDiagnostic(diagnostic),
                    date: moment().unix(),
                    message: helperAPI.outputToHTML(
                      getMessageForDiagnostic(diagnostic),
                    ),
                  }));
                taskAPI.addDiagnostics({ uri: "testcafe", diagnostics });
              }
            });
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.addDiagnostics({
            uri: "testcafe",
            diagnostics: [
              {
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
  isPackage: (packageName: string, dirname: string) => {
    if (path.basename(packageName) === "package.json") {
      const check = new File(
        path.join(
          packageName.slice(
            0,
            packageName.lastIndexOf(path.basename(packageName)),
          ),
          "node_modules",
          "testcafe",
        ),
      );
      return check.exists();
    } else {
      return false;
    }
  },
};
