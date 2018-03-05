"use babel";
// @flow

import type { HelperAPI } from "../../TaskExecutionFeature/Types/types";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types";
import type { Plugin } from "../../DevtoolLoadingFeature/Types/types";

const plugin: Plugin = {
  info: {
    iconUri: "atom://",
    name: "fake",
  },
  configSchema: {
    type: "string",
    default: "",
  },
  getStrategyForPlan(plan: PlanConfig, helperAPI: HelperAPI) {
    return {
      strategy: { type: "shell", command: "ls", cwd: "/" },
      controller: {
        onData() {},
        onError() {},
        onExit() {},
      },
    };
  },
  isPackage: "package.json",
};

export default plugin;
