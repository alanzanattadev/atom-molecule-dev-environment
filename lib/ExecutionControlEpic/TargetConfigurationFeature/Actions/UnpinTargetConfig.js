'use babel'
// @flow

import type {TargetConfig} from '../Types/types.js.flow';

export type UnpinTargetConfigAction = {
  type: "UNPIN_TARGET_CONFIGURATION",
  payload: {
    targetConfig: mixed
  }
};

export function unpinTargetConfig(targetConfig: TargetConfig): UnpinTargetConfigAction {
  return {
    type: "UNPIN_TARGET_CONFIGURATION",
    payload: {
      targetConfig
    }
  };
};
