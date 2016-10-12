'use babel'
// @flow

import type {TargetConfig} from "../Types/types.js";
import { fromJS, is } from "immutable";

export function areSameTargets(target1: TargetConfig, target2: TargetConfig): boolean {
  return is(
    fromJS(target1).remove('state').remove('pinned').remove('name'),
    fromJS(target2).remove('state').remove('pinned').remove('name')
  );
};
