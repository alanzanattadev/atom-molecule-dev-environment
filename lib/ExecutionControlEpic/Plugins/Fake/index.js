"use babel";
// @flow

import type { HelperApi } from "../../TaskExecutionFeature/Model/HelperApi";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types";

export default {
  infos: {
    iconUri: "atom://",
    name: "fake",
  },
  configSchema: {
    type: "string",
    default: "",
  },
  getStrategyForPlan(plan: PlanConfig, helperAPI: HelperApi) {
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
