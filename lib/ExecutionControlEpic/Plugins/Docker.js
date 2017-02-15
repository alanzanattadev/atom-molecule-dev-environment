'use babel'
// @flow

import type {PlanConfig} from "../PlanConfigurationFeature/Types/types.js.flow";

export default {
  infos: {
    name: 'docker',
    iconUri: 'atom://molecule-dev-environment/.storybook/public/devtool-icon-docker.png'
  },
  configSchema: {
    type: 'object',
    schemas: {
      image: {
        type: 'string',
        default: '',
        placeholder: 'ex: ubuntu'
      },
      ports: {
        type: 'array',
        default: [],
        items: {
          type: 'object',
          schemas: {
            host: {
              type: 'number',
              default: 80
            },
            container: {
              type: 'number',
              default: 80
            },
            binding: {
              type: 'string',
              default: '0.0.0.0',
              placeholder: 'address'
            }
          }
        }
      },
    }
  },
  getStrategyForPlan(plan: PlanConfig) {
    return {
      strategy: {
        type: 'shell',
        command: `docker run ${plan.config.ports.map(port => `-p ${port.binding}:${port.host}:${port.container}`).join(' ')} ${plan.config.image}`
      },
      controller: {

      }
    }
  }
};
