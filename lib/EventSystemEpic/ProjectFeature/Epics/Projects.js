"use babel";
// @flow

import Rx from "rxjs";
import { List } from "immutable";
import { removePackages } from "../../../ProjectSystemEpic/PackageFeature/Actions/RemovePackages";
import { refreshPackages } from "../../../ProjectSystemEpic/PackageFeature/Actions/RefreshPackages";
import { selectPlansReducer } from "../../../GlobalSystem/Selectors";
import { removePlanConfig } from "../../../ExecutionControlEpic/PlanConfigurationFeature/Actions/RemovePlanConfig";
import { selectAllPlans } from "../../../ExecutionControlEpic/PlanConfigurationFeature/Selectors/PlanConfigs";
import { selectProjectsReducer } from "../../../GlobalSystem/Selectors";
import { setActiveProjects } from "../Actions/SetActiveProjects";
import { DevToolsControllerInstance } from "../../../ExecutionControlEpic/DevtoolLoadingFeature/Model/DevToolsController";
import { apiPresets } from "../../FileFeature/Model/apiPresets";
import { createFilesWatcherObservable } from "../../FileFeature/Model/createFilesWatcherObservable";
import { shouldIgnorePath } from "../Model/ignore";
import type { WatchMan } from "../../FileFeature/Types/types.js";

export const generateProjectsFilesObs = (watchman: WatchMan, path: string) =>
  createFilesWatcherObservable(watchman, path, apiPresets.any, true)
    .filter(events => events.length > 0)
    .map(events =>
      events
        .filter(
          event => event.action === "created" && !shouldIgnorePath(event.path),
        )
        .map(event =>
          refreshPackages(
            path.concat(path.indexOf("\\") !== -1 ? "\\" : "/", event.path),
            DevToolsControllerInstance.getPackagesPlugins(),
          ),
        ),
    )
    .mergeAll();

const removePackagesFromDeletedProjects = (
  newProjects: Array<string>,
  activeProjects: List<string>,
) =>
  activeProjects.reduce(
    (acc, projectPath) =>
      newProjects.find(path => path === projectPath)
        ? acc
        : acc.push(removePackages(projectPath)),
    List(),
  );

const refreshPackagesFromAddedProjects = (
  newProjects: Array<string>,
  activeProjects: List<string>,
) =>
  newProjects.reduce(
    (acc, projectPath) =>
      activeProjects.includes(projectPath)
        ? acc
        : acc.push(
            refreshPackages(
              projectPath,
              DevToolsControllerInstance.getPackagesPlugins(),
            ),
          ),
    List(),
  );

const changeProjectsEpic = (watchman: WatchMan) => (action$: any, store: any) =>
  action$
    .ofType("CHANGE_ACTIVE_PROJECTS")
    .map(action => {
      const activeProjects = selectProjectsReducer(store.getState());
      const plans = selectAllPlans(selectPlansReducer(store.getState()));
      let newActiveProjects = List();
      let actions = List();

      if (!action.payload.isInit) {
        // Look for deleted packages
        actions = List([
          ...removePackagesFromDeletedProjects(
            action.payload.projects,
            activeProjects,
          ),
          ...refreshPackagesFromAddedProjects(
            action.payload.projects,
            activeProjects,
          ),
        ]);
      }
      // Look for added packages
      action.payload.projects.map(projectPath => {
        // Generate observable for new projects
        newActiveProjects = newActiveProjects.includes(projectPath)
          ? newActiveProjects
          : newActiveProjects.push(projectPath);
      });
      // Reducing to add the removal of plans related to the packages
      return Rx.Observable.merge(
        Rx.Observable.from(
          actions
            .reduce(
              (newActions: List<any>, cur: any) =>
                cur.type === "REMOVE_PACKAGES"
                  ? newActions.concat([
                      cur,
                      ...plans
                        .filter(
                          plan =>
                            plan.packageInfo.path === cur.payload.rootPath,
                        )
                        .map(plan => removePlanConfig(plan)),
                    ])
                  : newActions.push(cur),
              List(),
            )
            .push(setActiveProjects(newActiveProjects)),
        ),
        Rx.Observable.from(
          newActiveProjects.map(path =>
            generateProjectsFilesObs(watchman, path),
          ),
        ).mergeAll(),
      );
    })
    .mergeAll();

export default changeProjectsEpic;
