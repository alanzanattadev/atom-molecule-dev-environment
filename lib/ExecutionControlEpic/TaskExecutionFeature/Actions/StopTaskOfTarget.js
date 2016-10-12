'use babel'
// @flow
import type {TargetConfig} from "../../TargetConfigurationFeature/Types/types.js.flow";

export type StopTaskOfTargetAction = {
  type: 'STOP_TASK_OF_TARGET',
  payload: {
    target: TargetConfig,
    date: number
  };
};

export function stopTaskOfTarget(target: TargetConfig, date: number): StopTaskOfTargetAction {
  return {
    type: 'STOP_TASK_OF_TARGET',
    payload: {
      target,
      date
    }
  };
};
