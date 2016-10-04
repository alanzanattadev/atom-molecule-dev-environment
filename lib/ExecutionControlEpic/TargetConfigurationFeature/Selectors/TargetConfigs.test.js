'use babel'
// @flow

import {selectTargetsOfTool, selectPinnedTargets} from "./TargetConfigs";
import type {TargetConfigsReducer} from "../Reducers/TargetConfigs";

describe('TargetConfigs Selector', () => {
  let state: TargetConfigsReducer = [{
    tool: {
      iconUri: 'atom://myplugin/icon.png',
      name: 'docker',
      id: 'dockerid'
    },
    config: {
      service: 'web'
    },
    pinned: true,
    name: "web"
  }, {
    tool: {
      iconUri: 'atom://myplugin/icon.png',
      name: 'docker',
      id: 'dockerid'
    },
    config: {
      service: 'db'
    },
    pinned: false,
    name: "db"
  }, {
    tool: {
      iconUri: 'atom://myplugin/icon.png',
      name: 'gulp',
      id: 'gulp1'
    },
    config: {
      task: 'watch'
    },
    pinned: true,
    name: "target1"
  }, {
    tool: {
      iconUri: 'atom://myplugin/icon.png',
      name: 'nightwatch',
      id: 'nightwatch1'
    },
    config: {
      env: 'dev'
    },
    pinned: true,
    name: "target1"
  }];
  describe('selectTargetsOfTool', () => {
    it('should return targets of specific tool', () => {
      let subject = selectTargetsOfTool(state, "dockerid");

      expect(subject).toEqual([state[0], state[1]]);
    });
  });

  describe('selectPinnedTargets', () => {
    it('should return pinned targets', () => {
      let subject = selectPinnedTargets(state);

      expect(subject).toEqual([state[0], state[2], state[3]]);
    });
  });
});
