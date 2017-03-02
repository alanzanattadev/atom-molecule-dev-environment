'use babel';
// @flow

// $FlowFixMe
import { CompositeDisposable } from 'atom';
import store from './GlobalSystem/Store';
import {
  provideDevtool,
} from './ExecutionControlEpic/DevtoolLoadingFeature/Model/DevtoolLoadingHandler';
import Nightwatch from './ExecutionControlEpic/Plugins/Nightwatch';
import Docker from './ExecutionControlEpic/Plugins/Docker';
import Npm from './ExecutionControlEpic/Plugins/Npm';
import ChromeDevtools from './ExecutionControlEpic/Plugins/ChromeDevtools';
import Gulp from './ExecutionControlEpic/Plugins/Gulp';
import Flowtype from './ExecutionControlEpic/Plugins/Flowtype';
import ReduxDevtools from './ExecutionControlEpic/Plugins/ReduxDevtools';
import Jest from './ExecutionControlEpic/Plugins/Jest';
import Webpack from './ExecutionControlEpic/Plugins/Webpack';
import Testcafe from './ExecutionControlEpic/Plugins/Testcafe';
import generateQuestionAPI
  from './ExecutionControlEpic/QuestionSystemFeature/Model/api';
import {
  DevToolsControllerInstance,
} from './ExecutionControlEpic/DevtoolLoadingFeature/Model/DevToolsController';
import {
  refreshPackages,
} from './ProjectSystemEpic/PackageFeature/Actions/RefreshPackages';
import {
  findPackages,
} from './ProjectSystemEpic/PackageFeature/Model/FindPackages';
import {
  observeTabs,
} from './EditorContextEpic/TabsManagmentFeature/AtomLinks/RegisterTabsEvents';
import Rx from 'rxjs/Rx';

export default {
  subscriptions: null,

  activate(state: any) {
    console.log('activating molecule-dev-environment');
    let {
      renderDevtoolBar,
      devtoolBarPanel,
    } = require(
      './ExecutionControlEpic/DevToolsSummaryFeature/AtomLinks/Panels',
    );
    let {
      pinnedPlansPanel,
      renderPinnedPlans,
    } = require(
      './ExecutionControlEpic/PlanConfigurationFeature/AtomLinks/Panels',
    );
    let {
      renderSideDock,
    } = require('./GlobalSystem/AtomLinks/Panels');
    renderDevtoolBar();
    renderPinnedPlans();
    renderSideDock();

    // Bind plugins
    [
      Gulp,
      Docker,
      Webpack,
      Npm,
      ChromeDevtools,
      Flowtype,
      ReduxDevtools,
      Testcafe,
      Jest,
      Nightwatch,
    ].forEach(tool => provideDevtool(store, DevToolsControllerInstance)(tool));

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'molecule-dev-environment:toggle': () => {
          devtoolBarPanel.show();
          pinnedPlansPanel.show();
        },
        'molecule-dev-environment:ask': () => {
          generateQuestionAPI()
            .ask([
              {
                type: 'confirm',
              },
              {
                type: 'checkbox',
                name: 'test',
                message: 'What test runner do you want ?',
                choices: ['Jest', 'Karma', 'TestCafé'],
              },
              {
                type: 'input',
                name: 'name',
                message: "What's your name ?",
                default: '',
                when: () => {
                  return Rx.Observable.of(true).delay(1000);
                },
                loader: () => {
                  return Rx.Observable.of('Alan').delay(1000);
                },
                validator: () => {
                  return Rx.Observable.of(true).delay(1000);
                },
              },
              {
                type: 'confirm',
                name: 'admin',
                message: 'Do you want to exec as admin',
                default: false,
                when: answers => {
                  return Rx.Observable.of(answers.name == 'Alan').delay(1000);
                },
                loader: () => {
                  return Rx.Observable.of({}).delay(1000);
                },
                validator: () => {
                  return Rx.Observable.of(true).delay(1000);
                },
              },
              {
                type: 'input',
                name: 'name',
                message: "What's your name ?",
                default: '',
                when: () => {
                  return false;
                },
                loader: () => {
                  return Rx.Observable.of('Alan').delay(1000);
                },
                validator: () => {
                  return Rx.Observable.of(true).delay(1000);
                },
              },
              {
                type: 'list',
                choices: (answers, loaded) =>
                  ['dev', 'staging', 'preprod', 'production'].concat(
                    loaded || [],
                  ),
                name: 'NODE_ENV',
                message: 'Choose an env',
                default: 'preprod',
                when: () => {
                  return Rx.Observable.of(true).delay(1000);
                },
                loader: () => {
                  return Rx.Observable.of(['backup A', 'backup B']).delay(1000);
                },
                validator: answers => {
                  if (answers.NODE_ENV == 'backup A')
                    return Rx.Observable.of(false).delay(1000);
                  else
                    return Rx.Observable.of(true).delay(1000);
                },
              },
              {
                type: 'confirm',
                name: 'step',
              },
              {
                type: 'checkbox',
                name: 'test',
                message: 'What test runner do you want ?',
                choices: ['Jest', 'Karma', 'TestCafé'],
              },
              {
                type: 'checkbox',
                name: 'roles',
                message: 'What roles do you endorse ?',
                choices: (answers, loaded) =>
                  [
                    { value: 'front', description: 'Front end developer' },
                    { value: 'back', description: 'Back end developer' },
                    { value: 'devops', description: 'DevOps developer' },
                  ].concat(answers.admin ? ['admin'] : []),
                default: (answers, loaded) => ({
                  devops: true,
                  admin: answers.admin,
                }),
              },
              {
                type: 'confirm',
                name: 'finished',
              },
            ])
            .then(answers => {
              console.log('ANSWERS:', answers);
            })
            .catch(err => {
              console.log('ERROR:', err);
            });
        },
      }),
    );
    var path = require('path');
    // TEST
    let packages = findPackages(
      '/home/alan/Documents/dirt/molecule-test/project1/',
      [
        {
          tool: { name: 'webpack' },
          isPackage: /\.webpack\.js$/,
        },
        {
          tool: { name: 'git' },
          isPackage: (rootPath, directory) => path.basename(rootPath) == '.git'
            ? {
                name: rootPath,
                path: rootPath,
                plugin: {
                  tool: {
                    name: 'git',
                  },
                },
                type: 'file',
              }
            : false,
        },
        {
          tool: { name: 'npm' },
          isPackage: (rootPath, directory) =>
            path.basename(rootPath) == 'package.json',
        },
        {
          tool: { name: 'gulp' },
          isPackage: 'gulpfile.js',
        },
      ],
    );
    console.log(packages);
    packages.map(pkg => {
      console.log(pkg.plugin.tool.name, ':', pkg.name, 'of type', pkg.type);
    });
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {};
  },
};
