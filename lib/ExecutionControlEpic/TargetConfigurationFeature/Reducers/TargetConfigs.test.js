'use babel'
// @flow

import TargetConfigs from "./TargetConfigs";
import type {AddTargetConfigAction} from "../Actions/AddTargetConfig";
import {addTargetConfig} from '../Actions/AddTargetConfig';
import type {PinTargetConfigAction} from "../Actions/PinTargetConfig";
import {pinTargetConfig} from "../Actions/PinTargetConfig";
import type {UnpinTargetConfigAction} from "../Actions/UnpinTargetConfig";
import {unpinTargetConfig} from "../Actions/UnpinTargetConfig";
import type {TargetConfig} from "../Types/types.js.flow";

describe('TargetConfigs', () => {
  describe('ADD_TARGET_CONFIGURATION', () => {
    it('should add a target configuration', () => {
      let state = [];
      let action: AddTargetConfigAction = addTargetConfig("ls", {
        id: "toolid",
        name: "shell",
        iconUri: 'atom://myplugin/icon.png'
      }, "ls -l")
      let subject = TargetConfigs(state, action);

      expect(subject).toEqual([{
        name: "ls",
        tool: {id: "toolid", name: "shell", iconUri: 'atom://myplugin/icon.png'},
        config: "ls -l",
        pinned: false
      }]);
    });
  });

  describe('PIN_TARGET_CONFIGURATION', () => {
    it('should pin target config', () => {
      let targetConfig: TargetConfig = {
        name: "ls",
        tool: {
          id: "toolid",
          name: "shell",
          iconUri: 'atom://myplugin/icon.png'
        },
        config: "ls -l",
        pinned: false,
      };
      let targetConfig2: TargetConfig = {
        name: "mimikatz",
        tool: {
          id: "toolid",
          name: "powershell",
          iconUri: 'atom://myplugin/icon.png'
        },
        config: "Invoke-Mimikatz",
        pinned: false,
      };
      let state = [targetConfig, targetConfig2];
      let action: PinTargetConfigAction = pinTargetConfig(Object.assign({}, targetConfig, {state: null}));
      let subject = TargetConfigs(state, action);

      expect(subject).toEqual([Object.assign({}, targetConfig, {pinned: true}), targetConfig2]);
    });
  });

  describe('UNPIN_TARGET_CONFIGURATION', () => {
    it('should unpin target config', () => {
      let targetConfig: TargetConfig = {
        name: "ls",
        tool: {
          id: "toolid",
          name: "shell",
          iconUri: 'atom://myplugin/icon.png'
        },
        config: "ls -l",
        pinned: true
      };
      let targetConfig2: TargetConfig = {
        name: "mimikatz",
        tool: {
          id: "toolid",
          name: "powershell",
          iconUri: 'atom://myplugin/icon.png'
        },
        config: "Invoke-Mimikatz",
        pinned: false
      };
      let state = [targetConfig, targetConfig2];
      let action: UnpinTargetConfigAction = unpinTargetConfig(Object.assign({}, targetConfig, {state: null}));
      let subject = TargetConfigs(state, action);

      expect(subject).toEqual([Object.assign({}, targetConfig, {pinned: false}), targetConfig2]);
    });
  });
});
