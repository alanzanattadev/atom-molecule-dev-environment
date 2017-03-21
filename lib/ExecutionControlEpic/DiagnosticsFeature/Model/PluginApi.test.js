"use babel";
// @flow

import React from "react";
import {provideDiagnostics} from "./PluginApi";
import type {Diagnostic} from "../Types/types.js";

describe("Diagnostics Plugins API", () => {
  describe("provideDiagnostics", () => {
    it("should dispatch two ADD_DIAGNOSTIC_FOR_TASK", () => {
      let spy = jest.fn();
      let store = {
        dispatch: spy,
        getState: () => ({ tasks: [{ id: "taskid" }] }),
      };
      let diagnostic1: Diagnostic = {
        type: "warning",
        message: "",
        date: 1478043575,
        task: "983249",
        step: 2,
      };
      let diagnostic2: Diagnostic = {
        type: "error",
        message: "",
        date: 1478043575,
        task: "239482938",
        step: 2,
      };
      let subject = provideDiagnostics("taskid", store)([
        diagnostic1,
        diagnostic2,
      ]);

      expect(spy.mock.calls.length).toBe(1);
      expect(
        spy.mock.calls.find(
          call =>
            call[0].type == "ADD_DIAGNOSTICS_FOR_TASK" &&
              call[0].payload.diagnostics[0].task == "taskid",
        ),
      ).toBeDefined();
    });
  });
});
