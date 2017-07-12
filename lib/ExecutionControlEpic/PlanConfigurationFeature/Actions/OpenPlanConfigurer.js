"use babel";
// @flow

import type { DevToolInfos } from "../Types/types.js.flow";
import {
  renderToolConfigurer,
  renderToolPlans,
  toolPlansPanel,
} from "../AtomLinks/Panels";
import {
  sidePanel,
  sidePanelPanel,
} from "../../../GlobalSystem/AtomLinks/Panels";
import {
  refreshPackages,
} from "../../../ProjectSystemEpic/PackageFeature/Actions/RefreshPackages";
import {
  DevToolsControllerInstance,
} from "../../../ExecutionControlEpic/DevtoolLoadingFeature/Model/DevToolsController";

export function openPlanConfigurer(tool: DevToolInfos) {
  return (dispatch: any) => {
    const plugins = DevToolsControllerInstance.getPackagesPlugins();
    renderToolConfigurer(sidePanel, tool);
    sidePanelPanel.show();
    renderToolPlans(tool);
    toolPlansPanel.show();
    global.atom.project
      .getPaths()
      .map(projectPath => dispatch(refreshPackages(projectPath, plugins)));
  };
}
