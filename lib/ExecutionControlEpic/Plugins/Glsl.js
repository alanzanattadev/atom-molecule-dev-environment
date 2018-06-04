"use babel";
// @flow

import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types";
import path from "path";
import type { HelperAPI } from "../../TaskExecutionFeature/Types/types";
import type { Plugin } from "../../DevtoolLoadingFeature/Types/types";
import EslintDiagnostic from "./Eslint/Presenters/EslintDiagnostic.js";

const plugin: Plugin = {
  info: {
    name: "glsl",
    dominantColor: "#FFBAC3",
    iconUri: "atom://molecule/images/plugins/flow.png",
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
        command: "glslls --stdin",
        cwd: path.dirname(plan.packageInfo.path),
        lsp: true,
      },
      controller: {},
    };
  },

  DiagnosticView: EslintDiagnostic,
  isPackage: /.*(\.vert|\.frag)/,
};

export default plugin;
