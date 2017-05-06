"use babel";
// @flow

import { CompositeDisposable } from "atom";
import store from "./GlobalSystem/Store";
import {
  provideDevtool,
} from "./ExecutionControlEpic/DevtoolLoadingFeature/Model/DevtoolLoadingHandler";
import Nightwatch from "./ExecutionControlEpic/Plugins/Nightwatch";
import Npm from "./ExecutionControlEpic/Plugins/Npm";
import ChromeDevtools from "./ExecutionControlEpic/Plugins/ChromeDevtools";
import Gulp from "./ExecutionControlEpic/Plugins/Gulp";
import Flowtype from "./ExecutionControlEpic/Plugins/Flowtype";
import Jest from "./ExecutionControlEpic/Plugins/Jest";
import Webpack from "./ExecutionControlEpic/Plugins/Webpack";
import Eslint from "./ExecutionControlEpic/Plugins/Eslint";
import Shell from "./ExecutionControlEpic/Plugins/Shell";
import Testcafe from "./ExecutionControlEpic/Plugins/Testcafe";
import {
  DevToolsControllerInstance,
} from "./ExecutionControlEpic/DevtoolLoadingFeature/Model/DevToolsController";
import {
  TasksControllerInstance,
} from "./ExecutionControlEpic/TaskExecutionFeature/Model/TasksController";
import remote from "remote";
import {
  diagnosticsPanelPanel,
} from "./ExecutionControlEpic/DiagnosticsFeature/AtomLinks/Panels";
import { sidePanelPanel } from "./GlobalSystem/AtomLinks/Panels";
import {
  toolPlansPanel,
} from "./ExecutionControlEpic/PlanConfigurationFeature/AtomLinks/Panels";

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

    let { renderSideDock } = require("./GlobalSystem/AtomLinks/Panels");
    renderDevtoolBar();
    renderPinnedPlans();
    renderSideDock();

    // Bind plugins
    [
      Gulp,
      Webpack,
      Npm,
      ChromeDevtools,
      Eslint,
      Flowtype,
      Testcafe,
      Jest,
      Nightwatch,
      Shell,
    ].forEach(tool => provideDevtool(store, DevToolsControllerInstance)(tool));

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    // Register command that toggles this view
    //this.subscriptions.add();
    this.subscriptions.add(
      global.atom.commands.add("atom-workspace", {
        "molecule:hide-panel": () => {
          sidePanelPanel.hide();
          toolPlansPanel.hide();
          diagnosticsPanelPanel.hide();
        },
      }),
    );
    remote.getCurrentWindow().on("close", function() {
      TasksControllerInstance.killAll();
    });
  },

  deactivate() {
    this.subscriptions.dispose();
    TasksControllerInstance.killAll();
  },

  serialize() {
    return {};
  },
};
