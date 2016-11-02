'use babel'
// @flow

import React from 'react';
import { shallow, mount } from 'enzyme';
import {provideDiagnostics} from './PluginApi';
import type {Diagnostic} from "../Types/types.js";

describe('Diagnostics Plugins API', () => {
  describe('provideDiagnostics', () => {
    it('should dispatch two ADD_DIAGNOSTIC_FOR_TASK', () => {
      let spy = jest.fn();
      let store = {
        dispatch: spy
      };
      let diagnostic1: Diagnostic = {
        type: "warning",
        message: "",
        date: 1478043575,
        task: '983249'
      };
      let diagnostic2: Diagnostic = {
        type: "error",
        message: "",
        date: 1478043575,
        task: '239482938'
      };
      let subject = provideDiagnostics('taskid', store)([diagnostic1, diagnostic2]);

      expect(spy.mock.calls.length).toBe(2);
      expect(spy.mock.calls.find(call => call[0].type == "ADD_DIAGNOSTIC_FOR_TASK" && call[0].payload.diagnostic.task == 'taskid')).toBeDefined();
    });
  });
});
