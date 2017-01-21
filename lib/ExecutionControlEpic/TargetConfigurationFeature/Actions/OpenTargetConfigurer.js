'use babel'
// @flow

import type {DevToolInfos} from "../Types/types.js";
import {renderToolConfigurer, renderToolTargets, toolTargetsPanel} from "../AtomLinks/Panels";
import {sidePanel, sidePanelPanel} from '../../../GlobalSystem/AtomLinks/Panels';
import {refreshPackages} from '../../../ProjectSystemEpic/PackageFeature/Actions/RefreshPackages';

export type OpenTargetConfigurerAction = () => void;

export function openTargetConfigurer(tool: DevToolInfos) {
  return (dispatch) => {
    renderToolConfigurer(sidePanel, tool);
    sidePanelPanel.show();
    renderToolTargets(tool);
    toolTargetsPanel.show();
    atom.project.getPaths().map(
      projectPath => dispatch(refreshPackages(projectPath))
    )
  };
};
