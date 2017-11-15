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
      "../../../ExecutionControlEpic/Plugins/" + devToolPath,
    );
    let devtool = require(absolutePath).default || require(absolutePath);
    let infos = Object.assign({}, devtool.infos, {
      id: devtool.infos.name,
      uri: devToolPath,
    });
    devtoolsController.addDevTool(Object.assign({}, devtool, { infos }));
    store.dispatch(addDevTool(infos));
    store.dispatch(addPlanConfigSchema(infos, devtool.configSchema));
    store.dispatch(
      refreshAllProjectsPackages([
        Object.assign({}, { tool: infos }, { isPackage: devtool.isPackage }),
      ]),
    );
  };
}
