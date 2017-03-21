import React from "react";
import type {DiagnosticsReducer} from "./Diagnostics";
import Diagnostics from "./Diagnostics";
import type {AddDiagnosticForTaskAction} from "../Actions/AddDiagnosticForTask";
import {addDiagnosticForTask} from "../Actions/AddDiagnosticForTask";
import type {RemoveDiagnosticsForTaskAction} from "../Actions/RemoveDiagnosticsForTask";
import {removeDiagnosticsForTask} from "../Actions/RemoveDiagnosticsForTask";
import FakeDiagnostics, {
  dockerDBInfo1,
  dockerWeb1Error1,
  dockerWeb1Error2,
  dockerWeb2Warning1
} from "../Fake/Data/FakeDiagnostics";
import {List} from "immutable";

describe("Diagnostics Reducer", () => {
  describe("ADD_DIAGNOSTIC_FOR_TASK", () => {
    it("should add a diagnostic with the task as attribut", () => {
      let state: DiagnosticsReducer = List([
        FakeDiagnostics[0],
        FakeDiagnostics[1],
      ]);
      let action: AddDiagnosticForTaskAction = addDiagnosticForTask(
        FakeDiagnostics[2],
      );
      let subject = Diagnostics(state, action);

      expect(subject).toEqual(
        List([FakeDiagnostics[0], FakeDiagnostics[1], FakeDiagnostics[2]]),
      );
    });
  });

  describe("REMOVE_DIAGNOSTICS_OF_TASK", () => {
    it("should remove every task of given task id", () => {
      let state: DiagnosticsReducer = [
        dockerDBInfo1,
        dockerWeb1Error1,
        dockerWeb1Error2,
        dockerWeb2Warning1,
      ];
      let action: RemoveDiagnosticsForTaskAction = removeDiagnosticsForTask(
        dockerWeb1Error1.task,
      );
      let subject = Diagnostics(state, action);

      expect(subject).toEqual([dockerDBInfo1, dockerWeb2Warning1]);
    });
  });
});
