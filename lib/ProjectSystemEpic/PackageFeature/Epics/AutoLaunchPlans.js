"use babel";
// @flow

import Rx from "rxjs";
import type { AddPlanConfigAction } from "../../../ExecutionControlEpic/PlanConfigurationFeature/Actions/AddPlanConfig";
import { runTask } from "../../../ExecutionControlEpic/TaskExecutionFeature/Actions/RunTask";
import type { RunTaskAction } from "../../../ExecutionControlEpic/TaskExecutionFeature/Actions/RunTask";

const autoLaunchPlansEpic = (action$: Observable) => {
  return action$
    .ofType("ADD_PLAN_CONFIGURATION")
    .filter((action: AddPlanConfigAction) => action.payload.autoLaunch)
    .map((action: AddPlanConfigAction) =>
      runTask(action.payload, { type: "integrated" }),
    );
};

export default autoLaunchPlansEpic;
