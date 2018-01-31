"use babel";
// @flow

import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import path from "path";
import FlowDiagnostic from "./Presenters/FlowDiagnostic.js";
import type { HelperApi } from "../../TaskExecutionFeature/Model/HelperApi";

export default {
  info: {
    name: "flow",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-flow.png",
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
  getStrategyForPlan(plan: PlanConfig, helperAPI: HelperApi) {
    let binaryPath;
    let cmd;
    const options = "--stdio";

    if (plan.config.binary == "local")
      binaryPath = `${path.join(
        path.dirname(plan.packageInfo.path),
        "node_modules",
        ".bin",
        "flow-language-server",
      )}`;
    else binaryPath = "flow-language-server";

    cmd = `${binaryPath} ${options}`;

    return {
      strategy: {
        type: "shell",
        command: cmd,
        cwd: path.dirname(plan.packageInfo.path),
        lsp: true,
      },
      controller: {},
    };
  },
  DiagnosticView: FlowDiagnostic,
  isPackage: ".flowconfig",
};
