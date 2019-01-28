"use babel";
// @flow

import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import type { AddPlanConfigAction } from "../../../ExecutionControlEpic/PlanConfigurationFeature/Actions/AddPlanConfig";
import { runTask } from "../../../ExecutionControlEpic/TaskExecutionFeature/Actions/RunTask";

const autoRunPlansEpic = (action$: Observable) => {
  return action$.ofType("ADD_PLAN_CONFIGURATION").pipe(
    filter((action: AddPlanConfigAction) => action.payload.autoRun || false),
    map((action: AddPlanConfigAction) =>
      runTask(action.payload, { type: "integrated" }),
    ),
  );
};

export default autoRunPlansEpic;
