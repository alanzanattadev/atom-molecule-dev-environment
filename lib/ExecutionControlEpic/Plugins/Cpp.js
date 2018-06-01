"use babel";
// @flow

import type {
  Directory,
  PlanConfig,
} from "../../PlanConfigurationFeature/Types/types";
import type { Plugin } from "../../DevtoolLoadingFeature/Types/types";
import type { TaskAPI } from "../../LanguageServerProtocolFeature/Types/pluginApi";
import type { HelperAPI } from "../../TaskExecutionFeature/Types/types";
import EslintDiagnostic from "./Eslint/Presenters/EslintDiagnostic.js";
import type { PackageTesterResult } from "../../../ProjectSystemEpic/PackageFeature/Types/types";
import path from "path";
import fs from "fs";

const plugin: Plugin = {
  info: {
    name: "cpp",
    dominantColor: "#FFFFFF",
    iconUri: "atom://molecule/.storybook/public/devtool-icon-eslint.svg",
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
    },
  },

  getStrategyForPlan(plan: PlanConfig, helperAPI: HelperAPI) {
    return {
      strategy: {
        type: "shell",
        command: `clangd -compile-commands-dir=${plan.packageInfo.path}`,
        cwd: plan.packageInfo.path,
        lsp: true,
      },
      controller: {},
    };
  },

  DiagnosticView: EslintDiagnostic,

  isPackage: (
    packageName: string,
    directory: ?Directory,
  ): PackageTesterResult => {
    if (path.basename(packageName) === "compile_commands.json") {
      const packageDir = path.dirname(packageName);
      return {
        name: packageDir,
        path: packageDir,
        type: "directory",
      };
    } else {
      return false;
    }
  },
};

export default plugin;
