"use babel";
// @flow

import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types";
import type { Plugin } from "../../DevtoolLoadingFeature/Types/types";
import type { HelperAPI } from "../../TaskExecutionFeature/Types/types";
import type { PackageTesterResult } from "../../../ProjectSystemEpic/PackageFeature/Types/types";
import path from "path";

const plugin: Plugin = {
  info: {
    name: "cpp",
    dominantColor: "#FFFFFF",
    iconUri: "atom://molecule/images/plugins/cpp.png",
  },
  configSchema: {
    type: "object",
    schemas: {},
  },

  getStrategyForPlan(plan: PlanConfig, helperAPI: HelperAPI) {
    const packageDir = path.dirname(plan.packageInfo.path);
    return {
      strategy: {
        type: "shell",
        command: `clangd -compile-commands-dir=${packageDir}`,
        cwd: packageDir,
        lsp: true,
      },
      controller: {},
    };
  },

  isPackage: "compile_commands.json",

  generatePlansForPackage(packagePath: string): Array<GeneratedPlanObject> {
    return [
      {
        name: "lint",
        value: {},
        autoRun: true,
      },
    ];
  },
};

export default plugin;
