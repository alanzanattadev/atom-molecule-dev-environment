'use babel'
// @flow

// $FlowFixMe
import { CompositeDisposable } from 'atom';
import store from "./GlobalSystem/Store";
import {provideDevtool} from "./ExecutionControlEpic/DevtoolLoadingFeature/Model/DevtoolLoadingHandler";

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

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'molecule-dev-environment:toggle': () => {
        devtoolBarPanel.show();
        pinnedTargetsPanel.show();
        provideDevtool({
          infos: {
            name: 'docker',
            iconUri: 'atom://molecule-dev-environment/.storybook/public/devtool-icon-docker.png'
          },
          configSchema: {
            type: 'object',
            schemas: {
              image: {
                type: 'string',
                default: '',
                placeholder: 'ex: ubuntu'
              },
              ports: {
                type: 'array',
                default: [],
                items: {
                  type: 'object',
                  schemas: {
                    host: {
                      type: 'number',
                      default: 80
                    },
                    container: {
                      type: 'number',
                      default: 80
                    },
                    binding: {
                      type: 'string',
                      default: '0.0.0.0',
                      placeholder: 'address'
                    }
                  }
                }
              },
            }
          }
        }, store);
        provideDevtool({
          infos: {
            name: 'npm',
            iconUri: 'atom://molecule-dev-environment/.storybook/public/devtool-icon-npm.svg'
          },
          configSchema: {
            type: 'conditional',
            expression: {
              type: 'enum',
              enum: [
                {value: 'run', description: 'run'},
                {value: 'start', description: 'start'},
                {value: 'test', description: 'test'}
              ]
            },
            cases: {
              run: {
                type: 'string',
                default: '',
                placeholder: 'script'
              },
              start: null,
              test: null
            }
          }
        }, store);
        provideDevtool({
          infos: {
            name: 'nightwatch',
            iconUri: 'atom://molecule-dev-environment/.storybook/public/devtool-icon-nightwatch.png'
          },
          configSchema: {
            type: 'object',
            schemas: {
              env: {
                type: 'string',
                default: '',
                placeholder: 'env'
              }
            }
          }
        }, store);
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
