'use babel'
// @flow

import type {DevToolInfos} from "../Types/types.js";
import {renderToolConfigurer, renderToolTargets, toolTargetsPanel} from "../AtomLinks/Panels";
import {sidePanel, sidePanelPanel} from '../../../GlobalSystem/AtomLinks/Panels';

export type OpenTargetConfigurerAction = () => void;

export function openTargetConfigurer(tool: DevToolInfos) {
  return () => {
    renderToolConfigurer(sidePanel, tool);
    sidePanelPanel.show();
    renderToolTargets(tool);
    toolTargetsPanel.show();
  };
};
