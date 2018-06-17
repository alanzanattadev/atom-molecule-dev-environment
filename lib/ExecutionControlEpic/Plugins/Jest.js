"use babel";
// @flow

import moment from "moment";
import path from "path";
import fs from "fs";
import type { TaskAPI } from "../LanguageServerProtocolFeature/Types/pluginApi";
import type { HelperAPI } from "../TaskExecutionFeature/Types/types";
import type {
  Directory,
  GeneratedPlanObject,
  PlanConfig,
} from "../PlanConfigurationFeature/Types/types";
import type { PackageTesterResult } from "../../ProjectSystemEpic/PackageFeature/Types/types";
import type { Plugin } from "../DevtoolLoadingFeature/Types/types";

function getOutputFilePath(planName: string, helperAPI: HelperAPI): string {
  return helperAPI.fs.getTmpPath(
    `jest-${planName}.output.json`.replace(/ /g, "_"),
  );
}

const plugin: Plugin = {
  info: {
    name: "jest",
    dominantColor: "#AB4426",
    iconUri: "atom://molecule/images/plugins/jest.png",
  },
  configSchema: {
    type: "object",
    schemas: {
      configFile: {
        type: "file",
        label: "Configuration",
        default: "",
        tester: (packagePath: string, dirname: ?Directory) =>
          path.basename(packagePath).match(/.*jest.*(js|json)$/) != null,
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
        type: "enum",
        label: "binary",
        default: "local",
        enum: [
          { value: "local", description: "local" },
          { value: "global", description: "global" },
        ],
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
  getStrategyForPlan(plan: PlanConfig, helperApi: HelperAPI) {
    let binaryPath;
    if (plan.config.binary === "local")
      binaryPath = `${path.join(
        path.dirname(plan.packageInfo.path),
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
    if (plan.config.configFile !== "")
      command = `${command} --config ${plan.config.configFile}`;
    command = `${command} ${plan.config.watch ? "--watch" : ""}`;

    let env = plan.config.environmentVariables.reduce(function(
      env: any,
      varDeclaration: string,
    ) {
      let split = varDeclaration.split("=");
      return { ...env, [split[0]]: split[1] };
    },
    process.env);

    return {
      strategy: {
        type: "terminal",
        command: command,
        cwd: path.dirname(plan.packageInfo.path),
        env: env,
      },
      controller: {
        onData(data: string, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
          if (this.nextStepAtNextData === true) {
            this.nextStepAtNextData = false;
            taskAPI.diagnostics.clearAll();
          }
          if (
            data.toString().indexOf("Test results written to: ") !== -1 &&
            data.toString().indexOf(`jest-${plan.name}`.replace(/ /g, "_")) !==
              -1
          ) {
            taskAPI.busy.switchToWaitingMode();
            this.nextStepAtNextData = true;
            fs.readFile(
              `${getOutputFilePath(plan.name, helperAPI)}`,
              (err, json) => {
                if (!err) {
                  helperAPI.json.parseAsync(json.toString()).then(json => {
                    json.testResults.forEach(suite => {
                      if (suite.status === "passed") {
                        taskAPI.diagnostics.setForPath({
                          uri: suite.name,
                          diagnostics: [
                            {
                              range: {
                                start: { line: -1, character: -1 },
                                end: { line: -1, character: -1 },
                              },
                              severity: helperApi.severity.success,
                              message: suite.assertionResults
                                .map(assertionResult => assertionResult.title)
                                .join("\n"),
                              date: moment(suite.endTime),
                            },
                          ],
                        });
                      } else {
                        taskAPI.diagnostics.setForPath({
                          uri: suite.name,
                          diagnostics: [
                            {
                              range: {
                                start: { line: -1, character: -1 },
                                end: { line: -1, character: -1 },
                              },
                              severity: helperApi.severity.error,
                              message: suite.message,
                              date: moment(suite.endTime),
                            },
                          ],
                        });
                      }
                    });
                  });
                }
              },
            );
          } else if (
            data.toString().indexOf("Determining test suites to run...") !== -1
          ) {
            taskAPI.busy.switchToBusyMode();
          }
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
          taskAPI.diagnostics.setForWorkspace({
            uri: "jest",
            diagnostics: [
              {
                range: {
                  start: { line: -1, character: -1 },
                  end: { line: -1, character: -1 },
                },
                severity: helperApi.severity.error,
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
            "jest-cli",
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
  generatePlansForPackage(packagePath: string): Array<GeneratedPlanObject> {
    return [
      {
        name: "Watch-mode",
        value: {
          binary: "local",
          watch: true,
          configFile: "",
          modifiedOnly: false,
          environmentVariables: [],
        },
        autoRun: false, // Disabled for performances reasons
      },
      {
        name: "No-watch-mode",
        value: {
          binary: "local",
          watch: false,
          configFile: "",
          modifiedOnly: false,
          environmentVariables: [],
        },
      },
    ];
  },
};

export default plugin;
