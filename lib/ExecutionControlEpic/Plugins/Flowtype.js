'use babel'
// @flow
import type {TargetConfig} from "../TargetConfigurationFeature/Types/types.js.flow";
import moment from 'moment';
import path from 'path';

export default {
  infos: {
    name: 'flow',
    iconUri: 'atom://molecule-dev-environment/.storybook/public/devtool-icon-flow.png'
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
  },
  getStrategyForTarget(target: TargetConfig) {
    return {
      strategy: {
        type: 'shell',
        command: `flow status --quiet --json`,
        cwd: path.dirname(target.packageInfos.path),
      },
      controller: {
        onStdoutData(data: string, taskAPI: TaskAPI): void {
          taskAPI.cache.push(data.toString());
        },
        onStderrData(data: string, taskAPI: TaskAPI): void {

        },
        onExit(code: number, taskAPI: TaskAPI, helperAPI): void {
          helperAPI.json.parseAsync(taskAPI.cache.get().map(blob => blob.data).join('')).then((json) => {
            taskAPI.addDiagnostics(json.errors.map(error => ({
              type: "error",
              message: error.message.map(m => m.descr).join('<br/>'),
              date: moment().unix(),
            })));
          }).catch(e => {
            taskAPI.addDiagnostics([{
              type: "error",
              message: e,
              date: moment().unix(),
            }]);
          });
        },
        onError(err: any, taskAPI: TaskAPI): void {
        }
      }
    };
  },
  isPackage: '.flowconfig',
};
