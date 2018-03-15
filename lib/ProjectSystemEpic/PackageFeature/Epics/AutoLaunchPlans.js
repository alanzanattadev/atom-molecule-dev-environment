"use babel";
// @flow

import Rx from "rxjs";
import { List } from "immutable";
import type { AddPlanConfigAction } from "../../../ExecutionControlEpic/PlanConfigurationFeature/Actions/AddPlanConfig";
import type { Package } from "../Types/types.js.flow";

const generatePlansEpic = (action$: Observable, store: Store) => {
  return action$
    .ofType("ADD_PLAN_CONFIGURATION")
    .map((action: AddPlanConfigAction) => {
      return Rx.Observable.from(action.payload)
        .map(() => {
        })
        .mergeAll();
    })
    .mergeAll();
};

export default generatePlansEpic;
