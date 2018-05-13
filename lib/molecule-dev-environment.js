"use babel";
// @flow

import "babel-polyfill";
import atom from "atom";
import store from "./GlobalSystem/Store";
import watchman from "fb-watchman";
import { provideDevtool } from "./ExecutionControlEpic/DevtoolLoadingFeature/Model/DevtoolLoadingHandler";
import { DevToolsControllerInstance } from "./ExecutionControlEpic/DevtoolLoadingFeature/Model/DevToolsController";
import { toolPlansPanel } from "./ExecutionControlEpic/PlanConfigurationFeature/AtomLinks/Panels";
import handleStateChange from "./ExecutionControlEpic/LinterFeature/Model/StateChangeHandler";
import { createProjectsObservable } from "./EventSystemEpic/ProjectFeature/Model/createProjectsObservable";
import { refreshAllProjectsPackages } from "./ProjectSystemEpic/PackageFeature/Actions/RefreshAllProjectsPackages";
import { changeActiveProjects } from "./EventSystemEpic/ProjectFeature/Actions/ChangeActiveProjects";
import { renderDevtoolBar } from "./ExecutionControlEpic/DevToolsSummaryFeature/AtomLinks/Panels";
import { renderControlPanel } from "./ExecutionControlEpic/ControlPanelFeature/AtomLinks/Panels";

export default {
  subscriptions: null,
  atomProjectsObservable: null,

  activate() {
    let {
      renderPinnedPlans,
    } = require("./ExecutionControlEpic/PlanConfigurationFeature/AtomLinks/Panels");

    const client = new watchman.Client();
    client.on("error", () => {
      global.atom.notifications.addError(
        "Error starting Molecule: Could not start watchman. Make sure watchman is installed on your operating system and accessible from your PATH.",
        {
          description:
            "See https://facebook.github.io/watchman/docs/install.html for installation instructions",
        },
      );
    });
    client.capabilityCheck(
      { optional: [], required: ["relative_root"] },
      error => {
        if (error) {
          global.atom.notifications.addError(
            "Error starting Molecule: Error starting watchman. See developer console for details",
          );
        }
        client.end();
      },
    );

    renderDevtoolBar();
    renderPinnedPlans();
    renderControlPanel();

    // Bind plugins. Path should be relative to /lib/ExecutionControlEpic/Plugins/
    [
      "Eslint/index.js",
      "Flowtype.js",
      "Nightwatch/index.js",
      "Gulp.js",
      "Jest.js",
      "Npm.js",
      "ReactNative.js",
      "Shell.js",
      "Testcafe.js",
    ].forEach(tool => provideDevtool(store, DevToolsControllerInstance)(tool));

    // AUTO UPDATE - Manage projects & files for packages auto updates
    store.dispatch(changeActiveProjects(global.atom.project.getPaths(), true));
    this.atomProjectObservable = createProjectsObservable(
      global.atom.project,
    ).subscribe(projectPaths =>
      store.dispatch(changeActiveProjects(projectPaths)),
    );

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new atom.CompositeDisposable();
    this.subscriptions.add(
      global.atom.commands.add("atom-workspace", {
        "molecule:hide-panel": () => {
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
  },

  deactivate() {
    this.subscriptions.dispose();
    if (this.atomProjectObservable) this.atomProjectsObservable.unsubscribe();
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
