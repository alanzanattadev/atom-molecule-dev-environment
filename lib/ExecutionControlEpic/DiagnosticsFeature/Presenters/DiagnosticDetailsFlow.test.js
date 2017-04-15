"use babel";
// @flow

import React from "react";
import { mount } from "enzyme";
import DiagnosticDetailsFlow from "./DiagnosticDetailsFlow";
import type { Diagnostic } from "../Types/types.js.flow";
import DiagnosticDetails from "./DiagnosticDetails";

describe("DiagnosticDetailsFlow", () => {
  let diagnostics: Array<Diagnostic> = [
    {
      type: "error",
      message: "my first",
      step: 1,
    },
    {
      type: "warning",
      message: "my second diagnostic",
      step: 1,
    },
    {
      type: "info",
      message: "ok",
      step: 1,
    },
    {
      type: "success",
      message: "succeed",
      step: 1,
    },
  ];
  it("should display a list of DiagnosticDetails", () => {
    let subject = mount(<DiagnosticDetailsFlow diagnostics={diagnostics} />);

    expect(subject.find(DiagnosticDetails).length).toBe(4);
    expect(subject.find(DiagnosticDetails).at(1).prop("message")).toBe(
      "my second diagnostic",
    );
  });
});
