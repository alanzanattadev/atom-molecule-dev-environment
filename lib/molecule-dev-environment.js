'use babel'
// @flow

// $FlowFixMe
import { CompositeDisposable } from 'atom';
import store from "./GlobalSystem/Store";
import {provideDevtool} from "./ExecutionControlEpic/DevtoolLoadingFeature/Model/DevtoolLoadingHandler";
import Nightwatch from "./ExecutionControlEpic/Plugins/Nightwatch";
import Docker from "./ExecutionControlEpic/Plugins/Docker";
import Npm from "./ExecutionControlEpic/Plugins/Npm";
import ChromeDevtools from "./ExecutionControlEpic/Plugins/ChromeDevtools";
import Gulp from "./ExecutionControlEpic/Plugins/Gulp";
import Flowtype from "./ExecutionControlEpic/Plugins/Flowtype";
import ReduxDevtools from "./ExecutionControlEpic/Plugins/ReduxDevtools";
import Jest from "./ExecutionControlEpic/Plugins/Jest";
import Webpack from "./ExecutionControlEpic/Plugins/Webpack";
import {DevToolsControllerInstance} from "./ExecutionControlEpic/DevtoolLoadingFeature/Model/DevToolsController";

export default {

  subscriptions: null,

  activate(state: any) {
    console.log("activating molecule-dev-environment");
    let {renderDevtoolBar, devtoolBarPanel} = require('./ExecutionControlEpic/DevToolsSummaryFeature/AtomLinks/Panels');
    let {
      pinnedTargetsPanel,
      renderPinnedTargets,
    } = require('./ExecutionControlEpic/TargetConfigurationFeature/AtomLinks/Panels');
    renderDevtoolBar();
    renderPinnedTargets();

    // Bind plugins
    [Docker, Npm, Nightwatch, ChromeDevtools, Gulp, Flowtype, ReduxDevtools, Jest, Webpack]
      .forEach(tool => provideDevtool(store, DevToolsControllerInstance)(tool));

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();


    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'molecule-dev-environment:toggle': () => {
        devtoolBarPanel.show();
        pinnedTargetsPanel.show();
      }
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {};
  },
};
