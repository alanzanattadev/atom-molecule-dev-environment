"use babel";
// @flow

import type { Directory, PlanConfig } from "../../PlanConfigurationFeature/Types/types";
import type { TaskAPI } from "../../LanguageServerProtocolFeature/Types/pluginApi";
import path from "path";
import moment from "moment";
import { File } from "atom";
import type { HelperApi } from "../../TaskExecutionFeature/Model/HelperApi";
import EslintDiagnostic from "./Presenters/EslintDiagnostic.js";
import type { PackageTesterResult } from "../../../ProjectSystemEpic/PackageFeature/Types/types";
import fs from "fs";

function getOutputFilePath(planName: string, helperAPI: HelperApi): string {
  return helperAPI.fs.getTmpPath(`eslint-${planName}.output.json`);
}

export default {
  info: {
    name: "eslint",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-eslint.svg",
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
              placeholder: "lib/",
            },
          },
        },
      },
    },
  },
  getStrategyForPlan(plan: PlanConfig, helperApi: HelperApi) {
    let binaryPath;
    const sources = `${
      plan.config.sources.source
    } ${plan.config.sources.sourceArray.join(" ")}`;
    if (plan.config.binary.expressionValue === "local") {
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
        onExit(code: number, taskAPI: TaskAPI, helperAPI: HelperApi): void {},
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperApi): void {
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
