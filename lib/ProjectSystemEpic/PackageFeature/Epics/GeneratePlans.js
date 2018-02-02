"use babel";
// @flow

import Rx from "rxjs";

import {addPlanConfig} from "../../../ExecutionControlEpic/PlanConfigurationFeature/Actions/AddPlanConfig";

import type { PlanConfig } from "../../../ExecutionControlEpic/PlanConfigurationFeature/Types/types.js.flow";

const generatePlansEpic = (action$, store) => {
  return action$
    .ofType("PACKAGES_REFRESHED")
    .map(action => {
      let packages: Array<Package> = action.payload.packages;

      return Rx.Observable.from(packages)
        .map((packageInfo: Package) => {
          let planObjects: Array<
            PlanObject | Promise<PlanObject>
          > = (packageInfo.plugin.generatePlansForPackage || (() => []))(
            packageInfo.path
          );

          console.log(Rx.Observable.from(planObjects));
          if (planObjects.length > 0)
            console.log(
              addPlanConfig(
                planObjects[0].name,
                packageInfo.plugin.tool,
                planObjects[0],
                { type: "integrated" },
                packageInfo
              )
            );
          console.log("toto");
          let test = planObjects.map(planObject =>
            addPlanConfig(
              planObject.name,
              packageInfo.plugin.tool,
              planObject,
              { type: "integrated" },
              packageInfo
            )
          );
          console.log(test);
          return test;
        })
        .mergeAll();
    })
    .mergeAll();
};

export default generatePlansEpic;
