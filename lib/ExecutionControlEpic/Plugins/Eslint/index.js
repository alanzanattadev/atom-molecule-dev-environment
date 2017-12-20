"use babel";
// @flow

import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../../DevtoolLoadingFeature/Types/types.js.flow";
import fs from "fs";
import path from "path";
import moment from "moment";
import { File } from "atom";
import type { HelperApi } from "../../TaskExecutionFeature/Model/HelperApi";
import EslintDiagnostic from "./Presenters/EslintDiagnostic.js";

function getOutputFilePath(planName: string, helperAPI: HelperApi): string {
  return helperAPI.fs.getTmpPath(`eslint-${planName}.output.json`);
}

export default {
  infos: {
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
        path.dirname(plan.packageInfos.path),
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
        cwd: path.dirname(plan.packageInfos.path),
        env: {
          ESLINT_CWD: path.dirname(plan.packageInfos.path),
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
  isPackage: (packageName: string, dirname: string) => {
    if (path.basename(packageName).indexOf("eslintrc") !== -1) return true;
    else if (path.basename(packageName) === "package.json") {
      const check = new File(
        path.join(
          packageName.slice(
            0,
            packageName.lastIndexOf(path.basename(packageName)),
          ),
          "node_modules",
          "eslint",
        ),
      );
      return check.exists();
    } else {
      return false;
    }
  },
};
