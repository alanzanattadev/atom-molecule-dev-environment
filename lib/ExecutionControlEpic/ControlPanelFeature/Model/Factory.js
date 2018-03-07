"use babel";
// @flow

import { List, Map } from "immutable";
import type { PackagePanel } from "../Types/types";
import type { State } from "../../../GlobalSystem/types.js.flow";
import { selectTasksOfPlan } from "../../TaskExecutionFeature/Selectors/Tasks";
import type { Package } from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";

type PackageGroup = {
  rootPackage: Package,
  packages: List<Package>,
};

export function getPackagePanelsFromState(state: State): List<PackagePanel> {
  const initialState: List<PackagePanel> = List();
  return state.packages
    .reduce((red, list) => red.concat(list), List())
    .reduce((red: Map<string, PackageGroup>, packageInfo) => {
      const rootFound = red.keySeq().find(key => {
        return packageInfo.path.startsWith(key);
      });

      if (rootFound) {
        return red.update(rootFound, group => ({
          ...group,
          packages: group.packages.push(packageInfo),
        }));
      } else {
        return red.set(packageInfo.path, {
          rootPackage: packageInfo,
          packages: List.of(packageInfo),
        });
      }
    }, Map())
    .reduce(
      (packageReducer: List<PackagePanel>, packageFound: PackageGroup) => {
        return packageReducer.push({
          package: packageFound.rootPackage,
          tools: state.devtools
            .toList()
            .filter(devtool => {
              return (
                packageFound.packages.find(
                  packageOfGroup =>
                    packageOfGroup.plugin.tool.id === devtool.id,
                ) !== undefined
              );
            })
            .reduce((devtoolsReducer, devtool) => {
              return devtoolsReducer.push({
                tool: devtool,
                plans: state.plans
                  .get(devtool.id, List())
                  .toList()
                  .filter(plan => {
                    return plan.packageInfo.path.startsWith(
                      packageFound.rootPackage.path,
                    );
                  })
                  .map(plan => ({
                    plan,
                    tasks: selectTasksOfPlan(state.tasks, plan),
                  })),
              });
            }, List()),
        });
      },
      initialState,
    );
}
