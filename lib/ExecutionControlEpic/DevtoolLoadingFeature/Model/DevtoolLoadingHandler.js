"use babel";
// @flow

import type { ProvidedDevTool } from "../Types/types.js.flow";
import { addDevTool } from "../../DevToolsSummaryFeature/Actions/AddDevTool";
import { addPlanConfigSchema } from "../../PlanConfigurationFeature/Actions/AddPlanConfigSchema";
import DevToolsController from "./DevToolsController";
import { refreshAllProjectsPackages } from "../../../ProjectSystemEpic/PackageFeature/Actions/RefreshAllProjectsPackages";

export function provideDevtool(
  store: { dispatch(action: any): void },
  devtoolsController: DevToolsController,
): (devToolPath: string) => void {
  return function(devToolPath: string): void {
    let devtool = require("../../../ExecutionControlEpic/Plugins/" + devToolPath);
    let infos = Object.assign({}, devtool.infos, { id: devtool.infos.name, uri: devToolPath });
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
