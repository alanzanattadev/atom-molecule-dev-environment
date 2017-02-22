'use babel';
// @flow
import type {
  PlanConfig,
} from '../PlanConfigurationFeature/Types/types.js.flow';
import type { TaskAPI } from '../DevtoolLoadingFeature/Types/types.js.flow';
import path from 'path';
import moment from 'moment';

export default {
  infos: {
    name: 'testcafe',
    iconUri: 'atom://molecule-dev-environment/.storybook/public/devtool-icon-testcafe.png',
  },
  configSchema: {
    type: 'object',
    schemas: {
      binary: {
        type: 'conditional',
        expression: {
          type: 'enum',
          enum: [
            { value: 'local', description: 'local' },
            { value: 'global', description: 'global' },
          ],
        },
        cases: {
          local: null,
          global: null,
        },
      },
      browser: {
        type: 'string',
        title: 'browser',
        placeholder: 'firefox',
      },
      browserArray: {
        type: 'array',
        items: {
          type: 'string',
          title: 'browser',
          placeholder: 'chrome',
        },
      },
      testFile: {
        type: 'string',
        title: 'test file',
        placeholder: 'exemple/test',
      },
      testFileArray: {
        type: 'array',
        items: {
          type: 'string',
          title: 'test file',
          placeholder: 'exemple/test',
        },
      },
    },
  },
  getStrategyForPlan(plan: PlanConfig) {
    let binaryPath;
    const browsers = `${plan.config.browser},${plan.config.browserArray.join(
      ',',
    )}`;
    const files = `${plan.config.testFile} ${plan.config.testFileArray.join(
      ' ',
    )}`;
    if (plan.config.binary.expressionValue == 'local') {
      binaryPath = `${path.join(
        path.dirname(plan.packageInfos.path),
        'node_modules',
        '.bin',
        'testcafe',
      )}`;
    } else
      binaryPath = 'testcafe';
    const cmd = `${binaryPath} ${browsers} ${files}`;
    console.log(cmd);
    return {
      strategy: {
        type: 'shell',
        command: cmd,
      },
      controller: {
        onStdoutData(data: string, taskAPI: TaskAPI, helperAPI): void {
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
        onStderrData(data: string, taskAPI: TaskAPI, helperAPI): void {
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
        onExit(code: number, taskAPI: TaskAPI, helperAPI): void {},
        onError(err: any, taskAPI: TaskAPI, helperAPI): void {
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
  isPackage: 'package.json',
};
