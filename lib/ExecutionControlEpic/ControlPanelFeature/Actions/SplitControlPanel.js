"use babel";
// @flow

import { renderControlPanel } from "../AtomLinks/Panels";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";

export function splitControlPanel(plan: PlanConfig): () => void {
  return () => {
    renderControlPanel(plan);
  };
}
