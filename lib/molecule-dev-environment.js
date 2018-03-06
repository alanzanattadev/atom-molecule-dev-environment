"use babel";
// @flow

import "babel-polyfill";
import { CompositeDisposable } from "atom";
import store from "./GlobalSystem/Store";
import { provideDevtool } from "./ExecutionControlEpic/DevtoolLoadingFeature/Model/DevtoolLoadingHandler";
import { DevToolsControllerInstance } from "./ExecutionControlEpic/DevtoolLoadingFeature/Model/DevToolsController";
import { remote } from "electron";
import { toolPlansPanel } from "./ExecutionControlEpic/PlanConfigurationFeature/AtomLinks/Panels";
import handleStateChange from "./ExecutionControlEpic/LinterFeature/Model/StateChangeHandler";
import { createProjectsObservable } from "./EventSystemEpic/ProjectFeature/Model/createProjectsObservable";
import { refreshAllProjectsPackages } from "./ProjectSystemEpic/PackageFeature/Actions/RefreshAllProjectsPackages";
import { changeActiveProjects } from "./EventSystemEpic/ProjectFeature/Actions/ChangeActiveProjects";
import { renderControlPanel } from "./ExecutionControlEpic/ControlPanelFeature/AtomLinks/Panels";

export default {
  subscriptions: null,
  atomProjectsObservable: null,

  // eslint-disable-next-line no-unused-vars
  activate(state: any) {
    let {
      renderDevtoolBar,
    } = require("./ExecutionControlEpic/DevToolsSummaryFeature/AtomLinks/Panels");

    let {
      renderPinnedPlans,
    } = require("./ExecutionControlEpic/PlanConfigurationFeature/AtomLinks/Panels");

    // let { renderSideDock } = require("./GlobalSystem/AtomLinks/Panels");
    renderDevtoolBar();
    renderPinnedPlans();
    // renderSideDock();
    renderControlPanel();

    // Bind plugins. Path should be relative to /lib/ExecutionControlEpic/Plugins/
    [
      "Eslint/index.js",
      "Flowtype/index.js",
      "Nightwatch/index.js",
      "Gulp.js",
      "Jest.js",
      "Npm.js",
      "ReactNative.js",
      "Shell.js",
      "Testcafe.js",
      "Webpack.js",
    ].forEach(tool => provideDevtool(store, DevToolsControllerInstance)(tool));

    // AUTO UPDATE - Manage projects & files for packages auto updates
    store.dispatch(changeActiveProjects(global.atom.project.getPaths(), true));
    this.atomProjectObservable = createProjectsObservable(
      global.atom.project,
    ).subscribe(projectPaths =>
      store.dispatch(changeActiveProjects(projectPaths)),
    );
    // initProjectFeature(store.dispatch, global.atom.project.getPaths());
    // this.atomProjectsObservable = createProjectsObservable(
    //   global.atom.project,
    // ).subscribe(projectPaths =>
    //   handleProjectsChanges(
    //     projectPaths,
    //     DevToolsControllerInstance.getPackagesPlugins(),
    //     store.getState(),
    //   ).map(action => store.dispatch(action)),
    // );

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    // Register command that toggles this view
    //this.subscriptions.add();
    this.subscriptions.add(
      global.atom.commands.add("atom-workspace", {
        "molecule:hide-panel": () => {
          // sidePanelPanel.hide();
          toolPlansPanel.hide();
          const bottomDock = global.atom.workspace.getBottomDock();
          if (bottomDock.isVisible()) {
            bottomDock.hide();
          } else {
            bottomDock.show();
          }
        },
        "molecule:refresh-packages": () => {
          store.dispatch(
            refreshAllProjectsPackages(
              DevToolsControllerInstance.getPackagesPlugins(),
            ),
          );
        },
      }),
    );
    remote.getCurrentWindow().on("close", function() {});
  },

  deactivate() {
    this.subscriptions.dispose();
    if (this.atomProjectObservable) this.atomProjectsObservable.unsubscribe();
    // killProjectsFilesObservables();
  },

  serialize() {
    return {};
  },

  consumeIndie(registerIndie: any) {
    const linter = registerIndie({
      name: "molecule",
    });
    this.subscriptions.add(linter);
    store.subscribe(handleStateChange(linter));
  },
};
