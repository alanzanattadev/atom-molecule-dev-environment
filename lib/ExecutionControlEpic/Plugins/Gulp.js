'use babel'
// @flow

import type {TargetConfig} from "../TargetConfigurationFeature/Types/types.js.flow";
import type {TaskAPI} from "../DevtoolLoadingFeature/Types/types.js";
import moment from 'moment';
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
        onStdoutData(data: string, taskAPI: TaskAPI, helperAPI): void {
          taskAPI.addDiagnostics([{
            type: "info",
            message: {
              text: helperAPI.outputToHTML(data.toString()),
              html: true
            },
            date: moment().unix(),
          }]);
        },
        onStderrData(data: string, taskAPI: TaskAPI, helperAPI): void {
          taskAPI.addDiagnostics([{
            type: "error",
            message: {
              text: helperAPI.outputToHTML(data.toString()),
              html: true
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
              data: err,
            },
            date: moment().unix(),
          }]);
        }
      }
    };
  },
  isPackage: 'gulpfile.js'
};
