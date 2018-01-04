"use babel";
// @flow

import type { PlanConfig } from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js.flow";
import moment from "moment";
import path from "path";
import type { HelperApi } from "../TaskExecutionFeature/Model/HelperApi";
import { File } from "atom";

export default {
  info: {
    name: "react-native",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-react-native.svg",
  },
  configSchema: {
    type: "conditional",
    default: "start",
    expression: {
      type: "enum",
      label: "command",
      enum: [
        { value: "start", description: "start" },
        { value: "run_android", description: "run-android" },
        { value: "run_ios", description: "run-ios" },
        { value: "link", description: "link" },
        { value: "install", description: "install" },
      ],
    },
    cases: {
      start: {
        type: "object",
        schemas: {
          port: {
            type: "number",
            default: "",
            label: "Port",
            placeholder: "4200",
          },
        },
      },
      run_android: {
        type: "object",
        schemas: {
          options: {
            type: "string",
            default: "",
            label: "Options",
            placeholder: "--deviceId [string]...",
          },
        },
      },
      run_ios: {
        type: "object",
        schemas: {
          options: {
            type: "string",
            default: "",
            label: "Options",
            placeholder: '--simulator "iPhone 7"...',
          },
        },
      },
      install: {
        type: "object",
        schemas: {
          options: {
            type: "string",
            default: "",
            label: "Options",
            placeholder: "[options]",
          },
          package: {
            type: "string",
            default: "",
            label: "Package",
            placeholder: "<packageName>",
          },
        },
      },
      link: null,
    },
  },
  getStrategyForPlan(plan: PlanConfig, helperAPI: HelperApi) {
    let binaryPath = `${path.join(
      path.dirname(plan.packageInfo.path),
      "node_modules",
      ".bin",
      "react-native",
    )}`;
    let cmd;

    if (plan.config.expressionValue === "start") {
      cmd = binaryPath + " start";
      if (plan.config.expressionValue.port !== "")
        cmd += ` --port ${plan.config.caseValue.port}`;
    } else if (plan.config.expressionValue === "run_android") {
      cmd = binaryPath + ` run-android ${plan.config.caseValue.options}`;
    } else if (plan.config.expressionValue === "run_ios") {
      cmd = binaryPath + ` run-ios ${plan.config.caseValue.options}`;
    } else if (plan.config.expressionValue === "link") {
      cmd = binaryPath + ` link`;
    } else if (plan.config.expressionValue === "install") {
      cmd =
        binaryPath +
        ` install ${plan.config.caseValue.options} ${
          plan.config.caseValue.package
        }`;
    }
    return {
      strategy: {
        type: "terminal",
        command: cmd,
        cwd: path.dirname(plan.packageInfo.path),
      },
      controller: {
        onData(data: string, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          let datatype = "info";

          if (
            data.indexOf("success") !== -1 ||
            data.indexOf("Success") !== -1 ||
            data.indexOf("SUCCESS") !== -1
          ) {
            datatype = "success";
          } else if (
            data.indexOf("warning") !== -1 ||
            data.indexOf("Warning") !== -1 ||
            data.indexOf("WARNING") !== -1
          ) {
            datatype = "warning";
          } else if (
            data.indexOf("error") !== -1 ||
            data.indexOf("Error") !== -1 ||
            data.indexOf("ERROR") !== -1 ||
            data.indexOf("FAILURE") !== -1
          ) {
            datatype = "error";
          }

          if (datatype !== "info") {
            taskAPI.addDiagnostics([
              {
                type: datatype,
                message: data
                  .replace(
                    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-qry=><]/g,
                    "",
                  )
                  .toString(),
                date: moment().unix(),
              },
            ]);
          }
        },
        onExit(code: number, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          if (plan.config.expressionValue === "link") {
            taskAPI.addDiagnostics([
              {
                type: code === 0 ? "success" : "error",
                message:
                  code === 0
                    ? "Link: done."
                    : "Link: Something went wrong. See console for more information.",
                date: moment().unix(),
              },
            ]);
          }
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
          "react-native",
        ),
      );
      return check.exists();
    } else {
      return false;
    }
  },
};
