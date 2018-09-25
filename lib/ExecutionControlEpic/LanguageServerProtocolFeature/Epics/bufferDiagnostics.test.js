"use babel";
// @flow

import Rx from "rxjs";
import { bufferDiagnostics } from "./bufferDiagnostics";
import { setDiagnosticsForTask } from "../../DiagnosticsFeature/Actions/SetDiagnosticsForTask";
import { setDiagnosticsForPathsForTasks } from "../../DiagnosticsFeature/Actions/SetDiagnosticsForPathsForTasks";
import { removeDiagnosticsForTask } from "../../DiagnosticsFeature/Actions/RemoveDiagnosticsForTask";

describe("bufferDiagnostics", () => {
  const setDiagnosticsActions = [
    setDiagnosticsForTask({
      uri: "someUri0",
      task: "0",
      diagnostics: ["fakeDiagnostic0"],
    }),
    setDiagnosticsForTask({
      uri: "someUri1",
      task: "0",
      diagnostics: ["fakeDiagnostic1"],
    }),
    setDiagnosticsForTask({
      uri: "someUri2",
      task: "0",
      diagnostics: ["fakeDiagnostic2"],
    }),
  ];
  const removeDiagnosticsAction = removeDiagnosticsForTask("0");
  const bundledActions = [
    setDiagnosticsForPathsForTasks([
      {
        taskId: "0",
        paths: [{ diagnostics: ["fakeDiagnostic0"], path: "someUri0" }],
      },
    ]),
    setDiagnosticsForPathsForTasks([
      {
        taskId: "0",
        paths: [
          { diagnostics: ["fakeDiagnostic1"], path: "someUri1" },
          { diagnostics: ["fakeDiagnostic2"], path: "someUri2" },
        ],
      },
    ]),
  ];

  function _bufferAll(actions) {
    return bufferDiagnostics(Rx.Observable.from(actions))
      .toArray()
      .toPromise();
  }

  it("should bundle actions", async () => {
    expect(await _bufferAll([setDiagnosticsActions[0]])).toEqual([
      bundledActions[0],
    ]);
    expect(
      await _bufferAll([setDiagnosticsActions[1], setDiagnosticsActions[2]]),
    ).toEqual([bundledActions[1]]);
    expect(await _bufferAll([removeDiagnosticsAction])).toEqual([
      removeDiagnosticsAction,
    ]);
    expect(
      await _bufferAll([
        setDiagnosticsActions[1],
        setDiagnosticsActions[2],
        removeDiagnosticsAction,
      ]),
    ).toEqual([bundledActions[1], removeDiagnosticsAction]);
    expect(
      await _bufferAll([
        removeDiagnosticsAction,
        setDiagnosticsActions[1],
        setDiagnosticsActions[2],
      ]),
    ).toEqual([removeDiagnosticsAction, bundledActions[1]]);
    expect(
      await _bufferAll([
        setDiagnosticsActions[0],
        removeDiagnosticsAction,
        setDiagnosticsActions[1],
        setDiagnosticsActions[2],
      ]),
    ).toEqual([bundledActions[0], removeDiagnosticsAction, bundledActions[1]]);
  });

  it("should separate actions with a different taskId", async () => {
    const action = setDiagnosticsForTask({
      uri: "someUri32",
      task: "32",
      diagnostics: ["fakeDiagnostic32"],
    });

    const bundledAction = setDiagnosticsForPathsForTasks([
      {
        taskId: "0",
        paths: [{ diagnostics: ["fakeDiagnostic1"], path: "someUri1" }],
      },
      {
        taskId: "32",
        paths: [{ diagnostics: ["fakeDiagnostic32"], path: "someUri32" }],
      },
    ]);

    expect(await _bufferAll([setDiagnosticsActions[1], action])).toEqual([
      bundledAction,
    ]);
  });
});
