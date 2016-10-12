'use babel'
// @flow

import type {TargetConfig} from "../TargetConfigurationFeature/Types/types.js.flow";

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
        command: command
      },
      controller: {
        onStdoutData() {},
        onStderrData() {},
        onExit() {},
      }
    }
  }
};
