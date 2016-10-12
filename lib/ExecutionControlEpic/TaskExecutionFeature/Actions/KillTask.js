'use babel'
// @flow

import {stopTaskOfTarget} from "./StopTaskOfTarget";
import type {TargetConfig} from "../../TargetConfigurationFeature/Types/types.js.flow";
import {TasksControllerInstance} from "../Model/TasksController";
import moment from 'moment';

export function killTask(target: TargetConfig): () => any {
  return (dispatch) => {
    TasksControllerInstance.killTaskWithTarget(target);
    dispatch(stopTaskOfTarget(target, moment().unix()));
  }
};
