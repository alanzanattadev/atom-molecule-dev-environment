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
import EslintDiagnostic from "./Presenters/EslintDiagnostic.js";
import type { PackageTesterResult } from "../../../ProjectSystemEpic/PackageFeature/Types/types";
import fs from "fs";
import type { Plugin } from "../../DevtoolLoadingFeature/Types/types";

function getOutputFilePath(planName: string, helperAPI: HelperAPI): string {
  return helperAPI.fs.getTmpPath(`eslint-${planName}.output.json`);
}

const plugin: Plugin = {
  info: {
    name: "eslint",
    dominantColor: "#4A30C2",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-eslint.svg",
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
        label: "sources files",
        schemas: {
          source: {
            type: "string",
            label: "source",
            placeholder: "lib/",
            default: "lib/",
          },
          sourceArray: {
            type: "array",
            label: "aditional files",
            items: {
              type: "string",
              label: "source",
              default: "",
              placeholder: "lib/",
            },
          },
        },
      },
    },
  },
  getStrategyForPlan(plan: PlanConfig, helperApi: HelperAPI) {
    let binaryPath;
    const sources = `${
      plan.config.sources.source
    } ${plan.config.sources.sourceArray.join(" ")}`;
    if (plan.config.binary === "local") {
      binaryPath = `${path.join(
        path.dirname(plan.packageInfo.path),
        "node_modules",
        ".bin",
        "eslint",
      )}`;
    } else binaryPath = "eslint";
    const cmd = `${binaryPath} ${sources} -f json -o ${getOutputFilePath(
      plan.name,
      helperApi,
    )}`;
    return {
      strategy: {
        type: "node",
        path: path.join(__dirname, "Process", "lsp"),
        cwd: path.dirname(plan.packageInfo.path),
        env: {
          ESLINT_CWD: path.dirname(plan.packageInfo.path),
          ESLINT_BINARY: binaryPath,
        },
        lsp: true,
      },
      controller: {
        onData(): void {},
        onExit(code: number, taskAPI: TaskAPI, helperAPI: HelperAPI): void {},
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
          taskAPI.diagnostics.setForPath({
            uri: "eslint",
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
  DiagnosticView: EslintDiagnostic,
  isPackage: (
    packageName: string,
    directory: ?Directory,
  ): PackageTesterResult => {
    if (path.basename(packageName) === "package.json") {
      return new Promise(resolve =>
        fs.access(
          path.join(
            packageName.slice(
              0,
              packageName.lastIndexOf(path.basename(packageName)),
            ),
            "node_modules",
            "eslint",
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
