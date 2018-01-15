"use babel";
// @flow

import type { DevToolInfo } from "../Types/types.js.flow";
import {
  renderToolConfigurer,
  renderToolPlans,
  toolPlansPanel,
} from "../AtomLinks/Panels";
import { sidePanel } from "../../../GlobalSystem/AtomLinks/Panels";
import { refreshAllProjectsPackages } from "../../../ProjectSystemEpic/PackageFeature/Actions/RefreshAllProjectsPackages";
import { DevToolsControllerInstance } from "../../../ExecutionControlEpic/DevtoolLoadingFeature/Model/DevToolsController";

export function openPlanConfigurer(tool: DevToolInfo) {
  return (dispatch: any) => {
    const plugins = DevToolsControllerInstance.getPackagesPlugins();
    renderToolConfigurer(sidePanel, tool);
    renderToolPlans(tool);
    toolPlansPanel.show();
    dispatch(refreshAllProjectsPackages(plugins));
  };
}
