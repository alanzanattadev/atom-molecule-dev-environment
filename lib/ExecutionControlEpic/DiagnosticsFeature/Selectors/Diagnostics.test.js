'use babel'
// @flow

import {selectDiagnosticsOfTask} from "./Diagnostics";
import type {Diagnostic} from "../Types/types.js.flow";

describe('Diagnostics Selectors', () => {
  describe('selectDiagnosticsOfTask', () => {
    it('should get diagnostics of task', () => {
      let diagnostics: Array<Diagnostic> = [{
        type: "success",
        message: "",
        task: '2'
      }, {
        type: "error",
        message: "",
        task: '1'
      }, {
        type: "error",
        message: "",
        task: '2'
      }, {
        type: 'warning',
        message: "",
        task: '2'
      }, {
        type: 'info',
        message: "",
        task: '3'
      }];
      let taskId = '2';
      let subject = selectDiagnosticsOfTask(diagnostics, taskId);

      expect(subject).toEqual([diagnostics[0], diagnostics[2], diagnostics[3]]);
    });

    it('should return an empty array if no diagnostics are found for task', () => {
      let diagnostics: Array<Diagnostic> = [{
        type: 'success',
        message: "",
        taskId: '3'
      }];
      let taskId = '2';
      let subject = selectDiagnosticsOfTask(diagnostics, taskId);

      expect(subject).toEqual([]);
    });
  });
});
