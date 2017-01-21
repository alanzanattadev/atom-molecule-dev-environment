'use babel'
// @flow

import type {TargetConfig} from "../TargetConfigurationFeature/Types/types.js.flow";
import type {TaskAPI} from "../DevtoolLoadingFeature/Types/types.js";
import moment from 'moment';
import ansiToHtml from 'ansi-to-html';
import path from 'path';


export default {
  infos: {
    name: 'gulp',
    iconUri: 'atom://molecule-dev-environment/.storybook/public/devtool-icon-gulp.svg'
  },
  configSchema: {
    type: 'object',
    schemas: {
      task: {
        type: 'string',
        default: '',
        title: 'task',
        placeholder: 'task'
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
      binaryPath = `${path.join(path.dirname(target.packageInfos.path), 'node_modules', '.bin', 'gulp')}`;
    else
      binaryPath = 'gulp';
    return {
      strategy: {
        type: 'shell',
        command: `${binaryPath} ${target.config.task}`,
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
  isPackage: 'gulpfile.js'
};
