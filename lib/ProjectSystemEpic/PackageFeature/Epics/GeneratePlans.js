"use babel";
// @flow

import Rx from "rxjs";

import addPlanConfig from "../../../ExecutionControlEpic/PlanConfigurationFeature/Actions/AddPlanConfig";

import type { PlanConfig } from "../../../ExecutionControlEpic/PlanConfigurationFeature/Types/types.js.flow";

const generatePlansEpic = (action$, store) => {
  return action$
    .ofType("PACKAGES_REFRESHED")
    .map(action => {
      let packages : Array<PlanObject> = action.packages;

      Rx.Observable.from(packages)
        .map((packageInfo : Package) => {
          let planObjects: Array<PlanObject | Promise<PlanObject>> = (packageInfo.plugin.generatePlansForPackage || (() => []))(
            packageInfo.path,
          );

          return Rx.Observable.from(planObjects).map(planObject =>
            addPlanConfig(
              tool: packageInfo.plugin.tool,
              config: planObject,
              pinned: false,
              name: planConfig.name,
              stager: { type: "integrated" },
              packageInfo: packageInfo,
            )
          );
        })
        .mergeAll();
    })
    .mergeAll();
};

export default generatePlansEpic;
