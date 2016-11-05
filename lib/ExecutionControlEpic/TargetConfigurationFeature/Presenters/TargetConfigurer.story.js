import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TargetConfigurer from "./TargetConfigurer";
import type {ConfigSchemaPart} from "../Types/types.js.flow";

let targetSchemaConfig: ConfigSchemaPart = {
  type: "object",
  schemas: {
    env: {
      type: "enum",
      default: 'dev',
      enum: [
        {value: "dev", description: 'dev'},
        {value: "staging", description: 'staging'},
        {value: "preprod", description: 'preprod'},
        {value: "production", description: 'production'}
      ]
    },
    testPath: {
      type: "string",
      title: 'path',
      default: ''
    }
  }
};

let complexTargetConfig: ConfigSchemaPart = {
  type: 'conditional',
  expression: {
    type: 'enum',
    default :'compose',
    enum: [
      {value: 'basic', description: 'basic'},
      {value: 'compose', description: 'compose'}
    ]
  },
  cases: {
    basic: {
      type: 'object',
      schemas: {
        image: {
          type: 'string',
          title: 'image',
          default: 'ubuntu'
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
              }
            }
          }
        }
      }
    },
    compose: {
      type: 'object',
      schemas: {
        service: {
          type: 'enum',
          default: 'web',
          enum: [
            {value: 'web', description: 'web'},
            {value: 'db', 'description': 'db'},
            {value: 'proxy', description: 'proxy'}
          ]
        }
      }
    }
  }
};

storiesOf('TargetConfigurer', module)
  .add('Basic', () => (
    <TargetConfigurer config={targetSchemaConfig} onAddTarget={action("target")}/>
  ))
  .add('Complex', () => (
    <TargetConfigurer config={complexTargetConfig} onAddTarget={action("target")}/>
  ));
