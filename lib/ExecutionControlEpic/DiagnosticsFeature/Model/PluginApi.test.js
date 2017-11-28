"use babel";
// @flow

import { provideDiagnostics } from "./PluginApi";
import type { Diagnostic } from "../Types/types.js.flow";

describe("Diagnostics Plugins API", () => {
  describe("provideDiagnostics", () => {
    it("should dispatch one ADD_DIAGNOSTICS_FOR_TASK", () => {
      let spy = jest.fn();
      let store = {
        dispatch: spy,
        getState: () => ({ tasks: [{ id: "taskid" }] }),
      };
      let diagnostic1: Diagnostic = {
        severity: 2,
        message: "",
        date: 1478043575,
        task: "983249",
        step: 2,
      };
      let diagnostic2: Diagnostic = {
        severity: 1,
        message: "",
        date: 1478043575,
        task: "239482938",
        step: 2,
      };
      provideDiagnostics("taskid", store)({
        uri: "this is a uri",
        diagnostics: [diagnostic1, diagnostic2],
      });

      expect(spy.mock.calls.length).toBe(1);
      expect(
        spy.mock.calls.find(
          call =>
            call[0].type == "ADD_DIAGNOSTICS_FOR_TASK" &&
            call[0].payload.task == "taskid",
        ),
      ).toBeDefined();
    });
  });
});
