"use babel";
// @flow

import Rx from "rxjs";
import { addPlanConfig } from "../../../ExecutionControlEpic/PlanConfigurationFeature/Actions/AddPlanConfig";
import type { GeneratedPlanObject } from "../../../ExecutionControlEpic/PlanConfigurationFeature/Types/types.js.flow";
import type { Package } from "../Types/types.js.flow";
import { generatePlanId } from "../../../ExecutionControlEpic/PlanConfigurationFeature/Model/id";

const generatePlansEpic = (action$: Observable) => {
  return action$
    .ofType("PACKAGES_REFRESHED")
    .map(action => {
      let packages: Array<Package> = action.payload.packages;
      return Rx.Observable.from(packages)
        .map((packageInfo: Package) => {
          if (packageInfo.plugin.generatePlansForPackage == null) {
            return [];
          }
          let planObjects: Array<
            GeneratedPlanObject,
          > = packageInfo.plugin.generatePlansForPackage(packageInfo.path);

          return planObjects.map(planObject =>
            addPlanConfig(
              generatePlanId(),
              planObject.name,
              packageInfo.plugin.tool,
              planObject.value,
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
