'use babel'
// @flow

import {selectConfigSchemaOfTool} from "./PlanConfigSchemas";
import type {PlanConfigSchemasReducer} from "../Reducers/PlanConfigSchemas";

describe('PlanConfigSchemas Selectors', () => {
  describe('selectConfigSchemaOfTool', () => {
    it('should return config schema of specific tool', () => {
      let state: PlanConfigSchemasReducer = [{
        type: 'string',
        default: '',
        tool: {
          iconUri: 'atom://myplugin/icon.png',
          id: 'tool1',
          name: 'docker'
        }
      }, {
        type: 'number',
        default: 5,
        tool: {
          iconUri: 'atom://myplugin/icon.png',
          id: 'tool2',
          name: 'gulp'
        }
      }, {
        type: 'boolean',
        default: true,
        tool: {
          iconUri: 'atom://myplugin/icon.png',
          id: 'tool3',
          name: 'nightwatch'
        }
      }];
      let subject = selectConfigSchemaOfTool(state, "tool2");

      expect(subject).toEqual(state[1]);
    });
  });
});
