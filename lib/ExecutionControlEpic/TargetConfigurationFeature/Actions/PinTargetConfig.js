'use babel'
// @flow

import { fromJS } from "immutable";
import type {TargetConfig} from "../Types/types.js";


export type PinTargetConfigAction = {
  type: "PIN_TARGET_CONFIGURATION",
  payload: {
    targetConfig: TargetConfig
  }
};

export function pinTargetConfig(targetConfig: TargetConfig): PinTargetConfigAction {
  return {
    type: "PIN_TARGET_CONFIGURATION",
    payload: {
      targetConfig
    }
  };
};
