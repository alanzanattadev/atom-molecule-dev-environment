"use babel";
// @flow

import { addDevTool } from "../../DevToolsSummaryFeature/Actions/AddDevTool";
import { addPlanConfigSchema } from "../../PlanConfigurationFeature/Actions/AddPlanConfigSchema";
import DevToolsController from "./DevToolsController";
import { refreshAllProjectsPackages } from "../../../ProjectSystemEpic/PackageFeature/Actions/RefreshAllProjectsPackages";
import path from "path";

export function provideDevtool(
  store: { dispatch(action: any): void },
  devtoolsController: DevToolsController,
): (devToolPath: string) => void {
  return function(devToolPath: string): void {
    let absolutePath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "ExecutionControlEpic",
      "Plugins",
      devToolPath,
    );
    let devtool = require(absolutePath).default || require(absolutePath);
    let info = Object.assign({}, devtool.info, {
      id: devtool.info.name,
      uri: absolutePath,
    });
    devtoolsController.addDevTool(Object.assign({}, devtool, { info }));
    store.dispatch(addDevTool(info));
    store.dispatch(addPlanConfigSchema(info, devtool.configSchema));
    store.dispatch(
      refreshAllProjectsPackages([
        Object.assign({}, { tool: info }, { isPackage: devtool.isPackage }),
      ]),
    );
  };
}
