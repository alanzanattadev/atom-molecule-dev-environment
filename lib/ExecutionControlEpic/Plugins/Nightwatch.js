'use babel'
// @flow
import type {TargetConfig} from "../TargetConfigurationFeature/Types/types.js.flow";

export default {
  infos: {
    name: 'nightwatch',
    iconUri: 'atom://molecule-dev-environment/.storybook/public/devtool-icon-nightwatch.png'
  },
  configSchema: {
    type: 'object',
    schemas: {
      sources: {
        type: 'array',
        title: 'sources',
        items: {
          type: 'string',
          title: 'source',
          placeholder: 'path',
        }
      },
      options: {
        type: 'array',
        title: 'options',
        items: {
          type: 'conditional',
          expression: {
            type: 'enum',
            enum: [
              {value: 'config', description: '--config'},
              {value: 'output', description: '--output'},
              {value: 'reporter', description: '--reporter'},
              {value: 'env', description: '--env'},
              {value: 'verbose', description: '--verbose'},
              {value: 'test', description: '--test'},
              {value: 'testcase', description: '--testcase'},
              {value: 'group', description: '--group'},
              {value: 'skipgroup', description: '--skipgroup'},
              {value: 'filter', description: '--filter'},
              {value: 'tag', description: '--tag'},
              {value: 'skiptags', description: '--skiptags'},
              {value: 'retries', description: '--retries'},
              {value: 'suiteRetries', description: '--suiteRetries'}
            ]
          },
          cases: {
            config: {
              type: 'string',
              title: 'file',
              default: './nightwatch.json',
              placeholder: 'path',
            },
            output: {
              type: 'string',
              title: 'file',
              default: './tests_output',
              placeholder: 'path',
            },
            reporter: {
              type: 'string',
              title: 'file',
              default: './junit',
              placeholder: 'path',
            },
            env: {
              type: 'string',
              title: 'name',
              default: 'default',
              placeholder: 'name',
            },
            verbose: {
              type: 'boolean',
              default: 'true',
            },
            test: {
              type: 'string',
              title: 'name',
              default: '',
              placeholder: 'name',
            },
            testcase: {
              type: 'string',
              title: 'name',
              default: '',
              placeholder: 'name',
            },
            group: {
              type: 'string',
              title: 'name',
              default: '',
              placeholder: 'name',
            },
            skipgroup: {
              type: 'string',
              title: 'name',
              default: '',
              placeholder: 'name',
            },
            filter: {
              type: 'string',
              title: 'name',
              default: 'je sais pas',
              placeholder: 'name',
            },
            tag: {
              type: 'string',
              title: 'name',
              default: '',
              placeholder: 'name',
            },
            skiptags: {
              type: 'string',
              title: 'name',
              default: '',
              placeholder: 'name',
            },
            retries: {
              type: 'number',
              title: 'number of retries',
              default: '1',
              placeholder: 'number',
            },
            suiteRetries: {
              type: 'number',
              title: 'number of retries',
              default: '1',
              placeholder: 'number',
            }
          }
        }
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
