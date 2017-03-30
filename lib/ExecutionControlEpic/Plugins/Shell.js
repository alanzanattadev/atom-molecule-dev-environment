'use babel';
// @flow

import type {
  PlanConfig,
} from '../../PlanConfigurationFeature/Types/types.js.flow';
import type { TaskAPI } from '../../DevtoolLoadingFeature/Types/types.js.flow';
import path from 'path';
import moment from 'moment';
import type { HelperApi } from '../../TaskExecutionFeature/Model/HelperApi';

export default {
  infos: {
    name: 'shell',
    iconUri: 'atom://molecule-dev-environment/.storybook/public/devtool-icon-term.png',
  },
  configSchema: {
    type: 'object',
    schemas: {
      command: {
        type: 'string',
        title: 'command',
        placeholder: 'ex: rm,cp,...',
      },
      optionsArray: {
        type: 'array',
        title: 'args',
        items: {
          type: 'string',
          title: 'argument',
        },
      },
    },
  },
  getStrategyForPlan(plan: PlanConfig) {
    let binaryPath;
    const args = `${plan.config.optionsArray.join(' ')}`;
    const cmd = `${plan.config.command} ${args}`;
    return {
      strategy: {
        type: 'shell',
        command: cmd,
        cwd: plan.packageInfos.path,
      },
      controller: {
        onStdoutData(
          data: string,
          taskAPI: TaskAPI,
          helperAPI: HelperApi,
        ): void {
          taskAPI.addDiagnostics([
            {
              type: 'info',
              message: {
                text: helperAPI.outputToHTML(data.toString()),
                html: true,
              },
              date: moment().unix(),
            },
          ]);
        },
        onStderrData(
          data: string,
          taskAPI: TaskAPI,
          helperAPI: HelperApi,
        ): void {
          taskAPI.addDiagnostics([
            {
              type: 'error',
              message: {
                text: helperAPI.outputToHTML(data.toString()),
                html: true,
              },
              date: moment().unix(),
            },
          ]);
        },
        onExit(code: number, taskAPI: TaskAPI, helperAPI: HelperApi): void {},
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.addDiagnostics([
            {
              type: 'error',
              message: { data: err },
              date: moment().unix(),
            },
          ]);
        },
      },
    };
  },
  isPackage: (packageName: string, dirname: string) => {
    if (path.basename(packageName).indexOf('.sh') !== -1) {
      return {
        name: path.basename(path.dirname(packageName)) + '/',
        path: path.basename(packageName),
        type: 'directory',
      };
    } else if (
      path.basename(packageName).indexOf('.git') !== -1 &&
      path.basename(packageName).indexOf('.gitignore') === -1
    ) {
      return {
        name: path.basename(path.dirname(packageName)) + '/',
        path: path.dirname(packageName),
        type: 'directory',
      };
    } else {
      return false;
    }
  },
};
