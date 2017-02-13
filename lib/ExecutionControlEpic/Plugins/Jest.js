'use babel'
// @flow

import type {TargetConfig} from "../TargetConfigurationFeature/Types/types.js.flow";
import type {TaskAPI} from "../DevtoolLoadingFeature/Types/types.js";
import moment from 'moment';
import path from 'path';

export default {
  infos: {
    name: 'jest',
    iconUri: 'atom://molecule-dev-environment/.storybook/public/devtool-icon-jest.png'
  },
  configSchema: {
    type: 'object',
    schemas: {
      watch: {
        type: 'boolean',
        default: false,
        title: 'watch',
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
      binaryPath = `${path.join(path.dirname(target.packageInfos.path), 'node_modules', '.bin', 'jest')}`;
    else
      binaryPath = 'jest';
    return {
      strategy: {
        type: 'shell',
        command: `${binaryPath} --json ${target.config.watch ? '--watch' : ''} ${target.packageInfos.path != 'package.json' ? `--config ${target.packageInfos.path}` : ''} --useStderr --silent`,
        cwd: path.dirname(target.packageInfos.path),
      },
      controller: {
        onStdoutData(data: string, taskAPI: TaskAPI, helperAPI): void {
          try {
            let results = JSON.parse(data.toString());
            results.testResults.forEach(result => {
              if (result.status == 'passed') {
                taskAPI.addDiagnostics([{
                  type: "success",
                  message: result.assertionResults.map(assertionResult => assertionResult.title).join('\n'),
                  date: moment(result.endTime),
                }]);
              } else {
                taskAPI.addDiagnostics([{
                  type: "error",
                  message: `${result.name}${'\n'}${result.message}`,
                  date: moment(result.endTime),
                }]);
              }
            });
          } catch (e) {
            console.log(e);
            taskAPI.addDiagnostics([{
              type: "info",
              message: {
                text: helperAPI.outputToHTML(data.toString()),
                html: true,
              },
              date: moment().unix(),
            }]);
          }
        },
        onStderrData(data: string, taskAPI: TaskAPI, helperAPI): void {
          taskAPI.addDiagnostics([{
            type: "info",
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
              data: err
            },
            date: moment().unix(),
          }]);
        }
      }
    };
  },
  isPackage: (packagePath, dirname) => path.basename(packagePath).indexOf("jest.config") != -1 || path.basename(packagePath).indexOf(".jest.") != -1 || path.basename(packagePath) == 'package.json',
};
