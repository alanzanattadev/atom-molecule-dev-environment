'use babel'
// @flow

import TargetConfigSchemas from "./TargetConfigSchemas";
import type {AddTargetConfigSchemaAction} from "../Actions/AddTargetConfigSchema";
import {addTargetConfigSchema} from "../Actions/AddTargetConfigSchema";

describe('TargetConfigSchemas', () => {
  describe('ADD_TARGET_CONFIGURATION_SCHEMA', () => {
    it('should add a target configuration schema', () => {
      let action: AddTargetConfigSchemaAction = addTargetConfigSchema({
        id: "toolid",
        name: "shell",
        iconUri: 'atom://myplugin/icon.png'
      }, {
        type: "string",
        default: "test"
      });
      let state = [];
      let subject = TargetConfigSchemas(state, action);

      expect(subject).toEqual([{tool: {id: "toolid", name: "shell", iconUri: 'atom://myplugin/icon.png'}, type: "string", default: "test"}]);
    });
  });
});
