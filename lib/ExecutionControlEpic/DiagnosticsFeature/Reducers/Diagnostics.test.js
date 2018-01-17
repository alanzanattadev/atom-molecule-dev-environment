"use babel";
// @flow

import type { DiagnosticsReducer } from "./Diagnostics";
import Diagnostics from "./Diagnostics";
import type { RemoveDiagnosticsForTaskAction } from "../Actions/RemoveDiagnosticsForTask";
import { removeDiagnosticsForTask } from "../Actions/RemoveDiagnosticsForTask";
import type { SetDiagnosticsForTaskAction } from "../Actions/SetDiagnosticsForTask";
import { setDiagnosticsForTask } from "../Actions/SetDiagnosticsForTask";
import { setDiagnosticsForPathsForTasks } from "../Actions/SetDiagnosticsForPathsForTasks";
import {
  gulpDiagnostics,
  dockerDBInfo1,
  dockerWeb1Error1,
  dockerWeb1Error2,
  dockerWeb2Warning1,
} from "../Fake/Data/FakeDiagnostics";
import { List, Map } from "immutable";

describe("Diagnostics Reducer", () => {
  describe("SET_DIAGNOSTICS_FOR_PATH_FOR_TASK", () => {
    it("should init the Map with the diagnostic", () => {
      let state: DiagnosticsReducer = Map();
      let action: SetDiagnosticsForTaskAction = setDiagnosticsForTask({
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

  describe("SET_DIAGNOSTICS_FOR_PATHS_FOR_TASKS", () => {
    it("should init the Map with the diagnostic", () => {
      let subject = Diagnostics(
        undefined,
        setDiagnosticsForPathsForTasks([
          {
            taskId: "2",
            paths: [
              {
                path: "/test1",
                diagnostics: [],
              },
              {
                path: "/test2",
                diagnostics: [
                  {
                    severity: 1,
                    message: "aaaaah",
                  },
                  {
                    severity: 2,
                    message: "uuuuuh",
                  },
                ],
              },
            ],
          },
          {
            taskId: "3",
            paths: [
              {
                path: "/test3",
                diagnostics: [
                  {
                    severity: 1,
                    message: "test",
                  },
                  {
                    severity: 1,
                    message: "test2",
                  },
                  {
                    severity: 3,
                    message: "oups",
                  },
                ],
              },
            ],
          },
          {
            taskId: "4",
            paths: [
              {
                path: "/test1",
                diagnostics: [
                  {
                    severity: 2,
                    message: ":o",
                  },
                ],
              },
              {
                path: "/test2",
                diagnostics: [
                  {
                    severity: 2,
                    message: ":)",
                  },
                ],
              },
            ],
          },
        ]),
      );

      expect(subject).toMatchSnapshot();
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
