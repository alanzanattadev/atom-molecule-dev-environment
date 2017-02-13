'use babel'
// @flow

import type {TargetConfig} from "../TargetConfigurationFeature/Types/types.js.flow";
import type {TaskAPI} from "../DevtoolLoadingFeature/Types/types.js";
import moment from 'moment';
import path from 'path';

export default {
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
        title: 'script',
        placeholder: 'script'
      },
      start: null,
      test: null
    }
  },
  getStrategyForTarget(target: TargetConfig) {
    let command;
    if (target.config.expressionValue == 'run')
      command = `npm run ${target.config.caseValue}`;
    else if (target.config.expressionValue == 'test')
      command = 'npm test';
    else
      command = 'npm start';
    return {
      strategy: {
        type: 'shell',
        command: command,
        cwd: path.dirname(target.packageInfos.path),
      },
      controller: {
        onStdoutData(data: string, taskAPI: TaskAPI, helperAPI): void {
          taskAPI.addDiagnostics([{
            type: "info",
            message: {
              text: helperAPI.outputToHTML(data.toString()),
              html: true,
            },
            date: moment().unix(),
          }]);
        },
        onStderrData(data: string, taskAPI: TaskAPI, helperAPI): void {
          taskAPI.addDiagnostics([{
            type: "error",
            message: {
              text: helperAPI.outputToHTML(data.toString()),
              html: true,
            },
            date: moment().unix(),
          }]);
        },
        onExit(code: number, taskAPI: TaskAPI): void {

        },
        onError(err: any, taskAPI: TaskAPI): void {
          taskAPI.addDiagnostics([{
            type: "error",
            message: {
              data: err
            },
            date: moment().unix(),
          }]);
        }
      }
    }
  },
  isPackage: "package.json"
};
