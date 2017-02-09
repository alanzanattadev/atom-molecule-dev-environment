'use babel'
// @flow
import type {TargetConfig} from "../TargetConfigurationFeature/Types/types.js.flow";
import type {TaskAPI} from "../DevtoolLoadingFeature/Types/types.js";
import moment from 'moment';
import path from 'path';

export default {
  infos: {
    name: 'flow',
    iconUri: 'atom://molecule-dev-environment/.storybook/public/devtool-icon-flow.png'
  },
  configSchema: {
    type : 'conditional',
    expression: {
      type: 'enum',
      enum: [
        {value: 'server', description: 'server'},
        {value: 'check', description: 'status (check)'},
      ]
    },
    cases : {
      server : {
        type : 'object',
        schemas : {
          serverconfig : {
            type : 'conditional',
            expression: {
              type: 'enum',
              enum: [
                {value: 'start', description: 'start'},
                {value: 'stop', description: 'stop'},
              ]
            },
            cases : {
              start : {
                type : 'boolean',
                default : true,
                title : 'check files at server start'
              },
              stop : {
              }
            }
          }
        }
      },
      check : {
        type : 'object',
        schemas : {
          allerrors : {
            type : 'boolean',
            default : false,
            title : 'show all errors (50+)'
          }
        }
      }
    }
  },
  getStrategyForTarget(target: TargetConfig) {
    let binaryPath = `${path.join(path.dirname(target.packageInfos.path), 'node_modules', '.bin', 'flow')}`;
    let cmd;
    if (target.config.expressionValue == 'server') {
      cmd = `${binaryPath} ${(target.config.caseValue.serverconfig.expressionValue == 'start') ?
      (target.config.caseValue.serverconfig.caseValue ? '--quiet' : 'start') : 'stop'}`;
    } else {
      cmd = `${binaryPath} status ${target.config.caseValue.allerrors ? '--show-all-errors ' : ''}--no-auto-start --json`;
    }
    return {
      strategy: {
        type: 'shell',
        command: cmd,
        cwd: path.dirname(target.packageInfos.path),
      },
      controller: {
        onStdoutData(data: string, taskAPI: TaskAPI, helperAPI): void {
          try {
            let logs = JSON.parse(data.toString());
          }
          catch (err) {
            console.log(err);
            taskAPI.addDiagnostics([{
              type: "info",
              message: helperAPI.outputToHTML(data.toString()),
              date: moment().unix(),
            }]);
          }
        },
        onStderrData(data: string, taskAPI: TaskAPI, helperAPI): void {
          taskAPI.addDiagnostics([{
            type: "error",
            message: helperAPI.outputToHTML(data.toString()),
            date: moment().unix(),
          }]);
        },
        onExit(code: number, taskAPI: TaskAPI, helperAPI): void {
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI): void {
          taskAPI.addDiagnostics([{
            type: "error",
            message: helperAPI.outputToHTML(err.toString()),
            date: moment().unix(),
          }]);
        }
      }
    };
  },
  isPackage: '.flowconfig'
};
