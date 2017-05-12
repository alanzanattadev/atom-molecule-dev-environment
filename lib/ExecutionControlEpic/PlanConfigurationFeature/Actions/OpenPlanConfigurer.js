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

export function openPlanConfigurer(tool: DevToolInfos) {
  return (dispatch: any) => {
    renderToolConfigurer(sidePanel, tool);
    sidePanelPanel.show();
    renderToolPlans(tool);
    toolPlansPanel.show();
    global.atom.project
      .getPaths()
      .map(projectPath => dispatch(refreshPackages(projectPath)));
  };
}
