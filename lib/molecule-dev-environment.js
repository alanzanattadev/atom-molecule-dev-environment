"use babel";
// @flow

declare var atom: any;
import {CompositeDisposable} from "atom";
import store from "./GlobalSystem/Store";
import {provideDevtool} from "./ExecutionControlEpic/DevtoolLoadingFeature/Model/DevtoolLoadingHandler";
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
import {DevToolsControllerInstance} from "./ExecutionControlEpic/DevtoolLoadingFeature/Model/DevToolsController";
import {TasksControllerInstance} from "./ExecutionControlEpic/TaskExecutionFeature/Model/TasksController";
import remote from "remote";

export default {
  subscriptions: null,

  activate(state: any) {
    console.log("activating molecule-dev-environment");
    let {
      renderDevtoolBar,
      devtoolBarPanel,
    } = require(
      "./ExecutionControlEpic/DevToolsSummaryFeature/AtomLinks/Panels",
    );
    let {
      pinnedPlansPanel,
      renderPinnedPlans,
    } = require(
      "./ExecutionControlEpic/PlanConfigurationFeature/AtomLinks/Panels",
    );
    let {
      renderSideDock,
    } = require("./GlobalSystem/AtomLinks/Panels");
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

    remote.getCurrentWindow().on('close', function() {
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
