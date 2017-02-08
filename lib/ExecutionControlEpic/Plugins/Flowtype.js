'use babel'
// @flow
import type {TargetConfig} from "../TargetConfigurationFeature/Types/types.js.flow";
import type {TaskAPI} from "../DevtoolLoadingFeature/Types/types.js";
import ansiToHtml from 'ansi-to-html';
import moment from 'moment';
import path from 'path';

export default {
  infos: {
    name: 'flow',
    iconUri: 'atom://molecule-dev-environment/.storybook/public/devtool-icon-flow.png'
  },
  configSchema: {
    type: 'object',
    schemas : {
      errors : {
        type: 'boolean',
        default: false,
        title: 'Show all errors'
      },
      files : {
        type: 'boolean',
        default: false,
        title : 'Check all files'
      },
      binary: {
        type: 'conditional',
        expression: {
          type: 'enum',
          enum: [
            {value: 'local', description: 'local'},
            {value: 'global', description: 'global'},
          ]
        },
        cases: {
          local: null,
          global: null,
        }
      }
    }
  },
  getStrategyForTarget(target: TargetConfig) {
    let binaryPath;
    if (target.config.binary.expressionValue == 'local')
      binaryPath = `${path.join(path.dirname(target.packageInfos.path), 'node_modules', '.bin', 'flow')}`;
    else
      binaryPath = 'flow';
    return {
      strategy: {
        type: 'shell',
        command: `${binaryPath} check ${target.config.files ? '--all' : ''} ${target.config.errors ? '--show-all-errors' : ''}`,
        cwd: path.dirname(target.packageInfos.path),
      },
      controller: {
        onStdoutData(data: string, taskAPI: TaskAPI): void {
          let Convert = new ansiToHtml();
          taskAPI.addDiagnostics([{
            type: "info",
            message: Convert.toHtml(data.toString()),
            date: moment().unix(),
          }]);
        },
        onStderrData(data: string, taskAPI: TaskAPI): void {
          let Convert = new ansiToHtml();
          taskAPI.addDiagnostics([{
            type: "error",
            message: Convert.toHtml(data.toString()),
            date: moment().unix(),
          }]);
        },
        onExit(code: number, taskAPI: TaskAPI): void {
        },
        onError(err: any, taskAPI: TaskAPI): void {
          let Convert = new ansiToHtml();
          taskAPI.addDiagnostics([{
            type: "error",
            message: Convert.toHtml(err.toString()),
            date: moment().unix(),
          }]);
        }
      }
    };
  },
  isPackage: 'package.json'
};
