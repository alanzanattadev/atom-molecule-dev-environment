"use babel";
// @flow
import type { ProvidedDevTool } from "../Types/types.js.flow";
import type {
  PlanConfig
} from "../../PlanConfigurationFeature/Types/types.js.flow";
import type { Strategy } from "../../TaskExecutionFeature/Types/types.js.flow";
import type {
  Controller
} from "../../TaskExecutionFeature/Types/types.js.flow";
import type {
  Plugin as PackagesPlugin
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";

export default class DevToolsController {
  devtools: Array<ProvidedDevTool>;
  constructor() {
    this.devtools = [];
  }

  addDevTool(devtool: ProvidedDevTool): void {
    this.devtools.push(devtool);
  }

  getStrategy(
    plan: PlanConfig
  ): ?{ strategy: Strategy, controller: Controller } {
    let devtool = this.devtools.find(d => d.infos.id == plan.tool.id);
    console.log(devtool, this.devtools);
    if (devtool) {
      return devtool.getStrategyForPlan(plan);
    }
  }

  getPackagesPlugins(): Array<PackagesPlugin> {
    return this.devtools.map(devtool => ({
      tool: devtool.infos,
      isPackage: devtool.isPackage
    }));
  }
}

export let DevToolsControllerInstance = new DevToolsController();
