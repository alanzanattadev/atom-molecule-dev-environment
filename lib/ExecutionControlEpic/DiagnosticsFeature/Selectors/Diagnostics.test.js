"use babel";
// @flow

import { selectDiagnosticsOfTask } from "./Diagnostics";
import type { Diagnostic } from "../Types/types.js.flow";
import { List } from "immutable";

describe("Diagnostics Selectors", () => {
  describe("selectDiagnosticsOfTask", () => {
    it("should get diagnostics of task", () => {
      let diagnostics: List<Diagnostic> = List([
        {
          type: "success",
          message: "",
          step: 0,
          task: "2",
        },
        {
          type: "error",
          message: "",
          step: 0,
          task: "1",
        },
        {
          type: "error",
          message: "",
          step: 0,
          task: "2",
        },
        {
          type: "warning",
          message: "",
          step: 0,
          task: "2",
        },
        {
          type: "info",
          message: "",
          step: 0,
          task: "3",
        },
      ]);
      let taskId = "2";
      let subject = selectDiagnosticsOfTask(diagnostics, taskId);

      expect(subject).toMatchSnapshot();
    });

    it("should return an empty array if no diagnostics are found for task", () => {
      let diagnostics: List<Diagnostic> = List([
        {
          type: "success",
          message: "",
          step: 0,
          taskId: "3",
        },
      ]);
      let taskId = "2";
      let subject = selectDiagnosticsOfTask(diagnostics, taskId);

      expect(subject).toEqual(List());
    });
  });
});
