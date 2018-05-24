"use babel";
// @flow

import type { ProvidedDevTool } from "../Types/types";
import type { Plugin as PackagesPlugin } from "../../../ProjectSystemEpic/PackageFeature/Types/types";

export default class DevToolsController {
  devtools: Array<ProvidedDevTool>;
  constructor() {
    this.devtools = [];
  }

  addDevTool(devtool: ProvidedDevTool): void {
    this.devtools.push(devtool);
  }

  getView(toolID: string): any {
    let devtool = this.devtools.find(d => d.info.id == toolID);
    if (devtool) {
      return devtool.DiagnosticView;
    }
  }

  getPackagesPlugins(): Array<PackagesPlugin> {
    return this.devtools.map(devtool => ({
      tool: devtool.info,
      isPackage: devtool.isPackage,
    }));
  }
}

export let DevToolsControllerInstance = new DevToolsController();
