'use babel'
// @flow
import type {TargetConfig} from "../TargetConfigurationFeature/Types/types.js.flow";

export default {
  infos: {
    name: 'webpack',
    iconUri: 'atom://molecule-dev-environment/.storybook/public/devtool-icon-webpack.svg'
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
        command: `nightwatch --env ${target.config.env}`
      },
      controller: {

      }
    };
  }
};
