'use babel'
// @flow

import type {DevToolInfos} from "../Types/types.js";
import {renderToolConfigurer, toolConfigurerPanel} from "../AtomLinks/Panels";

export type OpenTargetConfigurerAction = () => void;

export function openTargetConfigurer(tool: DevToolInfos) {
  return () => {
    renderToolConfigurer(tool);
    toolConfigurerPanel.show();
  };
};
