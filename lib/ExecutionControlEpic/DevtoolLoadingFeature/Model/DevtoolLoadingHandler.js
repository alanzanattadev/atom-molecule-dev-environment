"use babel";
// @flow

import type { ProvidedDevTool } from "../Types/types.js.flow";
import type { DevTool } from "../../DevToolsSummaryFeature/Types/types.js.flow";
import { addDevTool } from "../../DevToolsSummaryFeature/Actions/AddDevTool";
import {
  addPlanConfigSchema
} from "../../PlanConfigurationFeature/Actions/AddPlanConfigSchema";
import DevToolsController from "./DevToolsController";

export function provideDevtool(
  store: { dispatch(action: any): void },
  devtoolsController: DevToolsController
): (devtool: ProvidedDevTool) => void {
  return function(devtool: ProvidedDevTool): void {
    let infos = Object.assign({}, devtool.infos, { id: devtool.infos.name });
    devtoolsController.addDevTool(Object.assign({}, devtool, { infos }));
    store.dispatch(addDevTool(infos));
    store.dispatch(addPlanConfigSchema(infos, devtool.configSchema));
  };
}
