"use babel";
// @flow
import type {
  PlanConfig
} from "../PlanConfigurationFeature/Types/types.js.flow";

export default {
  infos: {
    name: "chrome",
    iconUri: "atom://molecule-dev-environment/.storybook/public/devtool-icon-chrome.png"
  },
  configSchema: {
    type: "object",
    schemas: {
      env: {
        type: "string",
        default: "",
        placeholder: "env"
      }
    }
  },
  getStrategyForPlan(plan: PlanConfig) {
    return {
      strategy: {
        type: "shell",
        command: `nightwatch --env ${plan.config.env}`
      },
      controller: {}
    };
  }
};
