"use babel";
// @flow

import type {
  Directory,
  PlanConfig,
} from "../PlanConfigurationFeature/Types/types";
import type { TaskAPI } from "../LanguageServerProtocolFeature/Types/pluginApi";
import moment from "moment";
import path from "path";
import type { HelperAPI } from "../TaskExecutionFeature/Types/types";
import type { PackageTesterResult } from "../../ProjectSystemEpic/PackageFeature/Types/types";
import fs from "fs";
import type { Plugin } from "../DevtoolLoadingFeature/Types/types";

const plugin: Plugin = {
  info: {
    name: "react-native",
    iconUri: "atom://molecule/images/plugins/react-native.svg",
  },
  configSchema: {
    type: "conditional",
    expression: {
      type: "enum",
      label: "command",
      default: "start",
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
            default: 4200,
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
            placeholder: "<packagePath>",
          },
        },
      },
      link: null,
    },
  },
  getStrategyForPlan(plan: PlanConfig, helperAPI: HelperAPI) {
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
        onData(data: string, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
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
            taskAPI.diagnostics.setForWorkspace([
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
        onExit(code: number, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
          if (plan.config.expressionValue === "link") {
            taskAPI.diagnostics.setForWorkspace([
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
            "react-native",
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
