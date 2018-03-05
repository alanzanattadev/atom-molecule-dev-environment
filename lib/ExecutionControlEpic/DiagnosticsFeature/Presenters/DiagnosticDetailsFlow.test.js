"use babel";
// @flow

import * as React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import DiagnosticDetailsFlow from "./DiagnosticDetailsFlow";
import type { DiagnosticSeverity, MoleculeDiagnostic } from "../Types/types";
import DiagnosticDetails from "./DiagnosticDetails";
import { TasksReducerRecord } from "../../TaskExecutionFeature/Reducers/Tasks";
import { List, Map } from "immutable";

describe("DiagnosticDetailsFlow", () => {
  let diagnostics: Map<
    string,
    Map<DiagnosticSeverity, List<MoleculeDiagnostic>>,
  > = Map([
    [
      "uri",
      Map([
        [
          1,
          List([
            {
              severity: 1,
              message: "my first",
              range: {
                start: { line: 0, character: 0 },
                end: { line: 0, character: 0 },
              },
            },
          ]),
        ],
        [
          2,
          List([
            {
              severity: 2,
              message: "my second diagnostic",
              range: {
                start: { line: 0, character: 0 },
                end: { line: 0, character: 0 },
              },
            },
          ]),
        ],
        [
          3,
          List([
            {
              severity: 3,
              message: "ok",
              range: {
                start: { line: 0, character: 0 },
                end: { line: 0, character: 0 },
              },
            },
          ]),
        ],
        [
          5,
          List([
            {
              severity: 5,
              message: "succeed",
              range: {
                start: { line: 0, character: 0 },
                end: { line: 0, character: 0 },
              },
            },
          ]),
        ],
      ]),
    ],
  ]);
  it("should display a list of DiagnosticDetails", () => {
    const mockStore = configureStore([]);
    let subject = mount(
      <Provider store={mockStore({ tasks: new TasksReducerRecord() })}>
        <DiagnosticDetailsFlow diagnostics={diagnostics} />
      </Provider>,
    );

    expect(subject.find(DiagnosticDetails).length).toBe(4);
    expect(
      subject
        .find(DiagnosticDetails)
        .at(1)
        .prop("diagnostic").message,
    ).toBe("my second diagnostic");
  });
});
