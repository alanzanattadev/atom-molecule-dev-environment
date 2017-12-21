"use babel";
// @flow

import { CompositeDisposable } from "atom";
import store from "./GlobalSystem/Store";
import { provideDevtool } from "./ExecutionControlEpic/DevtoolLoadingFeature/Model/DevtoolLoadingHandler";
import { DevToolsControllerInstance } from "./ExecutionControlEpic/DevtoolLoadingFeature/Model/DevToolsController";
import { remote } from "electron";
import { toolPlansPanel } from "./ExecutionControlEpic/PlanConfigurationFeature/AtomLinks/Panels";
import handleStateChange from "./ExecutionControlEpic/LinterFeature/Model/StateChangeHandler";

export default {
  subscriptions: null,

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

    // Bind plugins. Path should be relative to /lib/ExecutionControlEpic/Plugins/
    [
      "Eslint/index.js",
      "Flowtype/index.js",
      "Nightwatch/index.js",
      "Docker.js",
      "Gulp.js",
      "Jest.js",
      "Npm.js",
      "ReactNative.js",
      "ReduxDevtools.js",
      "Shell.js",
      "Testcafe.js",
      "Webpack.js",
    ].forEach(tool => provideDevtool(store, DevToolsControllerInstance)(tool));

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
      }),
    );
    remote.getCurrentWindow().on("close", function() {});
  },

  deactivate() {
    this.subscriptions.dispose();
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
