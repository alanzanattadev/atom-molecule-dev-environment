"use babel";
// @flow

import type { DiagnosticsReducer } from "./Diagnostics";
import Diagnostics from "./Diagnostics";
import type { RemoveDiagnosticsForTaskAction } from "../Actions/RemoveDiagnosticsForTask";
import { removeDiagnosticsForTask } from "../Actions/RemoveDiagnosticsForTask";
import type { AddDiagnosticsForTaskAction } from "../Actions/AddDiagnosticsForTask";
import { addDiagnosticsForTask } from "../Actions/AddDiagnosticsForTask";
import FakeDiagnostics, {
  gulpDiagnostics,
  dockerDBInfo1,
  dockerWeb1Error1,
  dockerWeb1Error2,
  dockerWeb2Warning1,
} from "../Fake/Data/FakeDiagnostics";
import { List, Map } from "immutable";

describe("Diagnostics Reducer", () => {
  describe("ADD_DIAGNOSTICS_FOR_TASK", () => {
    it("should init the Map with the diagnostic", () => {
      let state: DiagnosticsReducer = Map();
      let action: AddDiagnosticsForTaskAction = addDiagnosticsForTask({
        uri: "this is a uri",
        task: gulpDiagnostics[0].task,
        diagnostics: gulpDiagnostics,
      });
      let subject = Diagnostics(state, action);

      expect(subject).toEqual(
        Map([
          [
            gulpDiagnostics[0].task,
            Map([
              [
                "this is a uri",
                Map([[gulpDiagnostics[0].severity, List(gulpDiagnostics)]]),
              ],
            ]),
          ],
        ]),
      );
    });
  });

  describe("REMOVE_DIAGNOSTICS_OF_TASK", () => {
    it("should remove every task of given task id", () => {
      let state: DiagnosticsReducer = Map([
        [
          dockerDBInfo1.task,
          Map([
            ["uri", Map([[dockerDBInfo1.severity, List([dockerDBInfo1])]])],
          ]),
        ],
        [
          dockerWeb1Error2.task,
          Map([
            [
              "uri",
              Map([
                [
                  dockerWeb1Error1.severity,
                  List([dockerWeb1Error1, dockerWeb1Error2]),
                ],
              ]),
            ],
          ]),
        ],
        [
          dockerWeb2Warning1.task,
          Map([
            [
              "uri",
              Map([[dockerWeb2Warning1.severity, List([dockerWeb2Warning1])]]),
            ],
          ]),
        ],
      ]);
      [dockerDBInfo1, dockerWeb1Error1, dockerWeb1Error2, dockerWeb2Warning1];
      let action: RemoveDiagnosticsForTaskAction = removeDiagnosticsForTask(
        dockerWeb1Error1.task,
      );
      let subject = Diagnostics(state, action);

      expect(subject).toEqual(
        Map([
          [
            dockerDBInfo1.task,
            Map([
              ["uri", Map([[dockerDBInfo1.severity, List([dockerDBInfo1])]])],
            ]),
          ],
          [
            dockerWeb2Warning1.task,
            Map([
              [
                "uri",
                Map([
                  [dockerWeb2Warning1.severity, List([dockerWeb2Warning1])],
                ]),
              ],
            ]),
          ],
        ]),
      );
    });
  });
});
