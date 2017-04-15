"use babel";
// @flow

import { stopTaskOfPlan } from "./StopTaskOfPlan";
import type {
  PlanConfig,
} from "../../PlanConfigurationFeature/Types/types.js.flow";
import { TasksControllerInstance } from "../Model/TasksController";
import moment from "moment";

export function killTask(plan: PlanConfig): () => any {
  return dispatch => {
    TasksControllerInstance.killTaskWithPlan(plan);
    dispatch(stopTaskOfPlan(plan, moment().unix()));
  };
}
