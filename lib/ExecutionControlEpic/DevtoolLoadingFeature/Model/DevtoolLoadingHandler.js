'use babel'
// @flow

import type {ProvidedDevTool} from "../Types/types.js.flow";
import type {DevTool} from "../../DevToolsSummaryFeature/Types/types.js.flow";
import {addDevTool} from "../../DevToolsSummaryFeature/Actions/AddDevTool";
import {addTargetConfigSchema} from "../../TargetConfigurationFeature/Actions/AddTargetConfigSchema";
import DevToolsController from "./DevToolsController";

export function provideDevtool(devtool: ProvidedDevTool, store: {dispatch(action: any): void}, devtoolsController: DevToolsController): void {
  let infos = Object.assign({}, devtool.infos, {id: devtool.infos.name});
  devtoolsController.addDevTool(Object.assign({}, devtool, {infos}));
  store.dispatch(addDevTool(infos));
  store.dispatch(addTargetConfigSchema(infos, devtool.configSchema));
}
