"use babel";
// @flow

import Rx from "rxjs";

import { addPlanConfig } from "../../../ExecutionControlEpic/PlanConfigurationFeature/Actions/AddPlanConfig";

import type { PlanConfig } from "../../../ExecutionControlEpic/PlanConfigurationFeature/Types/types.js.flow";

import { generatePlanId } from "../../../ExecutionControlEpic/PlanConfigurationFeature/Model/id";

const generatePlansEpic = (action$, store) => {
  return action$
    .ofType("PACKAGES_REFRESHED")
    .map(action => {
      let packages: Array<Package> = action.payload.packages;

      return Rx.Observable.from(packages)
        .map((packageInfo: Package) => {
          let planObjects: Array<
            PlanObject | Promise<PlanObject>,
          > = (packageInfo.plugin.generatePlansForPackage || (() => []))(
            packageInfo.path,
          );

          return planObjects.map(planObject =>
            addPlanConfig(
              generatePlanId(),
              planObject.name,
              packageInfo.plugin.tool,
              planObject,
              { type: "integrated" },
              packageInfo,
            ),
          );
        })
        .mergeAll();
    })
    .mergeAll();
};

export default generatePlansEpic;
