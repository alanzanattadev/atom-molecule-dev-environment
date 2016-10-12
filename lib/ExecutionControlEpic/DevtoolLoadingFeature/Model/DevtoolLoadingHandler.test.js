'use babel'
// @flow

import {provideDevtool} from "./DevtoolLoadingHandler";
import DevToolsController from "./DevToolsController";
import type {ProvidedDevTool} from "../Types/types.js.flow";

describe('DevtoolLoadingHandler', () => {
  describe('provideDevtool', () => {
    it('should dispatch an ADD_DEVTOOL action', () => {
      let spy = jest.fn();
      let store = {
        dispatch: spy
      };
      let devtool: ProvidedDevTool = {
        infos: {
          id: 'dockerid',
          iconUri: 'atom://',
          name: 'docker',
        },
        configSchema: {
          type: "string",
          default: ''
        },
        getStrategyForTarget(target) {return {strategy: {type: 'shell'}, controller: {}}}
      };
      let subject = provideDevtool(devtool, store, new DevToolsController());

      expect(spy).toBeCalled();
      expect(spy.mock.calls.find(call => call[0].type == "ADD_DEVTOOL")).toBeDefined();
    });

    it('should dispatch an ADD_TARGET_CONFIGURATION_SCHEMA action', () => {
      let spy = jest.fn();
      let store = {
        dispatch: spy
      };
      let devtool: ProvidedDevTool = {
        infos: {
          id: 'dockerid',
          iconUri: 'atom://',
          name: 'docker',
        },
        configSchema: {
          type: "string",
          default: ''
        },
        getStrategyForTarget(target) {return {strategy: {type: 'shell'}, controller: {}}}
      };
      let subject = provideDevtool(devtool, store, new DevToolsController());

      expect(spy).toBeCalled();
      expect(spy.mock.calls.find(call => call[0].type == "ADD_TARGET_CONFIGURATION_SCHEMA")).toBeDefined();
    });
  });
});
