"use babel";
// @flow

import React from "react";
import { shallow, mount } from "enzyme";
import DiagnosticDetailsFlow from "./DiagnosticDetailsFlow";
import type { Diagnostic } from "../Types/types.js.flow";
import DiagnosticDetails from "./DiagnosticDetails";

describe("DiagnosticDetailsFlow", () => {
  let diagnostics: Array<Diagnostic> = [
    {
      type: "error",
      message: "my first"
    },
    {
      type: "warning",
      message: "my second diagnostic"
    },
    {
      type: "info",
      message: "ok"
    },
    {
      type: "success",
      message: "succeed"
    }
  ];
  it("should display a list of DiagnosticDetails", () => {
    let subject = shallow(<DiagnosticDetailsFlow diagnostics={diagnostics} />);

    expect(subject.find(DiagnosticDetails).length).toBe(4);
    expect(subject.find(DiagnosticDetails).at(1).prop("message")).toBe(
      "my second diagnostic"
    );
  });
});
