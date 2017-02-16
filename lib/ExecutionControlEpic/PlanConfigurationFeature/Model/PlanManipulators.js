"use babel";
// @flow

import type { PlanConfig } from "../Types/types.js";
import { fromJS, is } from "immutable";

export function areSamePlans(plan1: PlanConfig, plan2: PlanConfig): boolean {
  return is(
    fromJS(plan1).remove("state").remove("pinned").remove("name"),
    fromJS(plan2).remove("state").remove("pinned").remove("name")
  );
}
