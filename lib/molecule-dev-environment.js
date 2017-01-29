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
import {refreshPackages} from './ProjectSystemEpic/PackageFeature/Actions/RefreshPackages';
import {findPackages} from './ProjectSystemEpic/PackageFeature/Model/FindPackages';
import {observeTabs} from './EditorContextEpic/TabsManagmentFeature/AtomLinks/RegisterTabsEvents';

export default {

  subscriptions: null,

  activate(state: any) {
    console.log("activating molecule-dev-environment");
    let {
      renderDevtoolBar,
      devtoolBarPanel
    } = require('./ExecutionControlEpic/DevToolsSummaryFeature/AtomLinks/Panels');
    let {
      pinnedTargetsPanel,
      renderPinnedTargets,
    } = require('./ExecutionControlEpic/TargetConfigurationFeature/AtomLinks/Panels');
    let {
      renderSideDock
    } = require('./GlobalSystem/AtomLinks/Panels');
    renderDevtoolBar();
    renderPinnedTargets();
    renderSideDock();

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
    var path = require('path');
    // TEST
    let packages = findPackages("/home/alan/Documents/dirt/molecule-test/project1/", [{
      tool: {name: "webpack"},
      isPackage: /\.webpack\.js$/,
    }, {
      tool: {name: "git"},
      isPackage: (rootPath, directory) => path.basename(rootPath) == ".git" ? {
        name: rootPath,
        path: rootPath,
        plugin: {
          tool: {
            name: "git"
          }
        },
        type: "file",
      } : false,
    }, {
      tool: {name: "npm"},
      isPackage: (rootPath, directory) => path.basename(rootPath) == "package.json",
    }, {
      tool: {name: "gulp"},
      isPackage: "gulpfile.js",
    }])
    console.log(packages);
    packages.map(package => {
      console.log(package.plugin.tool.name, ":", package.name, "of type", package.type);
    });

  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {};
  },
};
