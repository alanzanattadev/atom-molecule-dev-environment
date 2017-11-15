"use babel";
// @flow

import * as React from "react";
import { mount } from "enzyme";
import DiagnosticDetailsFlow from "./DiagnosticDetailsFlow";
import type { Diagnostic, DiagnosticSeverity } from "../Types/types.js.flow";
import DiagnosticDetails from "./DiagnosticDetails";
import { Map, List } from "immutable";

describe("DiagnosticDetailsFlow", () => {
  let diagnostics: Map<
    string,
    Map<DiagnosticSeverity, List<Diagnostic>>,
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
              step: 1,
            },
          ]),
        ],
        [
          2,
          List([
            {
              severity: 2,
              message: "my second diagnostic",
              step: 1,
            },
          ]),
        ],
        [
          3,
          List([
            {
              severity: 3,
              message: "ok",
              step: 1,
            },
          ]),
        ],
        [
          5,
          List([
            {
              severity: 5,
              message: "succeed",
              step: 1,
            },
          ]),
        ],
      ]),
    ],
  ]);
  it("should display a list of DiagnosticDetails", () => {
    let subject = mount(<DiagnosticDetailsFlow diagnostics={diagnostics} />);

    expect(subject.find(DiagnosticDetails).length).toBe(4);
    expect(
      subject
        .find(DiagnosticDetails)
        .at(1)
        .prop("message"),
    ).toBe("my second diagnostic");
  });
});
