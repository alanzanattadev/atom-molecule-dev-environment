"use babel";
// @flow

import type { ProvidedDevTool } from "../Types/types.js.flow";
import type { HelperApi } from "../../TaskExecutionFeature/Model/HelperApi";
import type {
  PlanConfig,
} from "../../PlanConfigurationFeature/Types/types.js.flow";
import type {
  Controller,
  Strategy,
} from "../../TaskExecutionFeature/Types/types.js.flow";
import type {
  Plugin as PackagesPlugin,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import type {
  DevToolInfos,
} from "../../PlanConfigurationFeature/Types/types.js.flow";

/**
 * Allow you to access properties from DevTools once they are loaded.
 */
export default class DevToolsController {
  devtools: Array<ProvidedDevTool>;
  constructor() {
    this.devtools = [];
  }

  addDevTool(devtool: ProvidedDevTool): void {
    this.devtools.push(devtool);
  }

  getStrategy(
    plan: PlanConfig,
    helperAPI: HelperApi,
  ): ?{ strategy: Strategy, controller: Controller } {
    let devtool = this.devtools.find(d => d.infos.id === plan.tool.id);
    if (devtool) {
      return devtool.getStrategyForPlan(plan, helperAPI);
    }
  }

  getPackagesPlugins(): Array<PackagesPlugin> {
    return this.devtools.map(devtool => ({
      tool: devtool.infos,
      isPackage: devtool.isPackage,
    }));
  }

  /**
   * Get validator for the given devTool
   * @param toolId string containing the tool ID.
   * @returns {*} the validator if it exists.
   */
  getValidationMethodForPlugin(
    toolId: string,
  ): ?(value: any, props: any) => boolean {
    let validator = null;

    this.devtools.forEach(d => {
      if (d.infos.id === toolId && validator === null) {
        validator = d.validator;
      }
    });

    return validator;
  }
}

export let DevToolsControllerInstance = new DevToolsController();
