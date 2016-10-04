'use babel'
// @flow

import type {ProvidedDevTool} from "../Types/types.js.flow";
import type {DevTool} from "../../DevToolsSummaryFeature/Types/types.js.flow";
import {addDevTool} from "../../DevToolsSummaryFeature/Actions/AddDevTool";
import {addTargetConfigSchema} from "../../TargetConfigurationFeature/Actions/AddTargetConfigSchema";

export function provideDevtool(devtool: ProvidedDevTool, store: {dispatch(action: any): void}): void {
  store.dispatch(addDevTool(Object.assign({}, devtool.infos, {id: devtool.infos.name})));
  store.dispatch(addTargetConfigSchema(Object.assign({}, devtool.infos, {id: devtool.infos.name}), devtool.configSchema));
}
