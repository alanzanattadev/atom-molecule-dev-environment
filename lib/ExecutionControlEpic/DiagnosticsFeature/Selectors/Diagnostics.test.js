"use babel";
// @flow

import { selectDiagnosticsOfTask } from "./Diagnostics";
import type { DiagnosticsReducer } from "../Reducers/Diagnostics";
import { Map, List } from "immutable";

describe("Diagnostics Selectors", () => {
  describe("selectDiagnosticsOfTask", () => {
    it("should get diagnostics of task", () => {
      let diagnostics: DiagnosticsReducer = Map([
        [
          "1",
          Map([
            [
              "this is a uri",
              Map([
                [
                  1,
                  List([
                    {
                      severity: 1,
                      message: "",
                      step: 0,
                      task: "1",
                    },
                  ]),
                ],
              ]),
            ],
          ]),
        ],
        [
          "2",
          Map([
            [
              "this is another uri",
              Map([
                [
                  1,
                  List([
                    {
                      severity: 1,
                      message: "",
                      step: 0,
                      task: "2",
                    },
                    {
                      severity: 1,
                      message: "test 1",
                      step: 0,
                      task: "2",
                    },
                    {
                      severity: 1,
                      message: "test 2",
                      step: 0,
                      task: "2",
                    },
                  ]),
                ],
              ]),
            ],
          ]),
        ],
      ]);
      let taskId = "2";
      let subject = selectDiagnosticsOfTask(diagnostics, taskId);

      expect(subject).toMatchSnapshot();
    });

    it("should return an empty array if no diagnostics are found for task", () => {
      let diagnostics: DiagnosticsReducer = Map([
        [
          "3",
          Map([
            [
              "this is a uri",
              Map([
                [
                  1,
                  List([
                    {
                      severity: 1,
                      message: "",
                      step: 0,
                      taskId: "3",
                    },
                  ]),
                ],
              ]),
            ],
          ]),
        ],
      ]);
      let taskId = "2";
      let subject = selectDiagnosticsOfTask(diagnostics, taskId);

      expect(subject).toEqual(Map());
    });
  });
});
