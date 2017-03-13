"use babel";
// @flow

import React from "react";
import { shallow, mount } from "enzyme";
import type { Diagnostic, DiagnosticMode } from "../Types/types.js";
import DiagnosticsTraveller from "./DiagnosticsTraveller";
import DiagnosticsModeSelector from "./DiagnosticsModeSelector";
import DiagnosticsSelectors from "./DiagnosticsSelectors";
import DiagnosticDetails from "./DiagnosticDetails";
import DiagnosticsSearchField from "./DiagnosticsSearchField";
import DiagnosticDetailsFlow from "./DiagnosticDetailsFlow";

describe("DiagnosticsTraveller", () => {
  it("should display diagnostics selectors", () => {
    let diagnostics: Array<Diagnostic> = [
      { type: "warning", message: "a message", step: 1 },
      { type: "success", message: "a message", step: 1 }
    ];
    let subject = shallow(<DiagnosticsTraveller diagnostics={diagnostics} />);

    expect(subject.find(DiagnosticsSelectors).length).toBe(1);
    expect(
      subject.find(DiagnosticsSelectors).at(0).prop("diagnosticIndex")
    ).toBe(0);
    expect(
      subject.find(DiagnosticsSelectors).at(0).prop("diagnosticType")
    ).toBe("warning");
  });

  it("should display DiagnosticDetailsFlow because of logs mode", () => {
    let mode: DiagnosticMode = "logs";
    let subject = shallow(<DiagnosticsTraveller mode={mode} />);

    expect(subject.find(DiagnosticDetailsFlow).length).toBe(1);
  });

  it("should display DiagnosticDetails because of undefined mode", () => {
    let mode: DiagnosticMode = undefined;
    let subject = shallow(<DiagnosticsTraveller mode={mode} />);

    expect(subject.find(DiagnosticDetails).length).toBe(1);
  });

  it("should display diagnostics mode selector", () => {
    let diagnostics: Array<Diagnostic> = [
      { type: "warning", message: "a message", step: 1 },
      { type: "success", message: "a message", step: 1 }
    ];
    let subject = shallow(<DiagnosticsTraveller diagnostics={diagnostics} />);

    expect(subject.find(DiagnosticsModeSelector).length).toBe(1);
  });

  it("should display diagnostic search field", () => {
    let diagnostics: Array<Diagnostic> = [
      { type: "warning", message: "a message", step: 1 },
      { type: "success", message: "a message", step: 1 }
    ];
    let subject = shallow(<DiagnosticsTraveller diagnostics={diagnostics} />);

    expect(subject.find(DiagnosticsSearchField).length).toBe(1);
  });

  it("should display diagnostics details", () => {
    let diagnostics: Array<Diagnostic> = [
      { type: "warning", message: "a message", step: 1 },
      { type: "success", message: "a message", step: 1 }
    ];
    let subject = shallow(<DiagnosticsTraveller diagnostics={diagnostics} />);

    expect(subject.find(DiagnosticDetails).length).toBe(1);
  });

  it(
    "should display warnings details when warning selector is selected",
    () => {
      let diagnostics: Array<Diagnostic> = [
        { type: "warning", message: "a message", step: 1 },
        { type: "success", message: "a message", step: 1 }
      ];
      let subject = shallow(<DiagnosticsTraveller diagnostics={diagnostics} />);

      subject.find(DiagnosticsSelectors).at(0).prop("onSelected")("success", 0);

      expect(subject.state(""));
    }
  );

  it("should display success details when infos selector is selected", () => {
    let diagnostics: Array<Diagnostic> = [
      { type: "warning", message: "a message", step: 1 },
      { type: "success", message: "a message of success", step: 1 }
    ];
    let subject = mount(<DiagnosticsTraveller diagnostics={diagnostics} />);

    subject.find(DiagnosticsSelectors).at(0).prop("onSelected")("success", 0);

    expect(subject.find(DiagnosticDetails).at(0).prop("message")).toBe(
      "a message of success"
    );
  });

  it(
    "should display second success details when onForward is called for success selectors",
    () => {
      let diagnostics: Array<Diagnostic> = [
        { type: "warning", message: "a message", step: 1 },
        { type: "success", message: "a message of success", step: 1 },
        { type: "success", message: "a message of success 2", step: 1 }
      ];
      let subject = mount(<DiagnosticsTraveller diagnostics={diagnostics} />);

      subject.find(DiagnosticsSelectors).at(0).prop("onSelected")("success", 1);

      expect(subject.find(DiagnosticDetails).at(0).prop("message")).toBe(
        "a message of success 2"
      );
    }
  );

  it("should display every details when log mode is selected", () => {
    let diagnostics: Array<Diagnostic> = [
      { type: "warning", message: "a message", step: 1 },
      { type: "success", message: "a message haha", step: 1 },
      { type: "success", message: "a message haha", step: 1 },
      { type: "success", message: "a message", step: 1 }
    ];
    let subject = mount(<DiagnosticsTraveller diagnostics={diagnostics} />);

    subject.find(DiagnosticsModeSelector).at(0).prop("onClick")();
    subject.find(DiagnosticsSearchField).at(0).prop("onChange")("haha");

    expect(subject.find(DiagnosticDetailsFlow).length).toBe(1);
    expect(subject.find(DiagnosticsSelectors).length).toBe(0);
    expect(
      subject.find(DiagnosticDetailsFlow).at(0).prop("diagnostics").length
    ).toBe(2);
  });

  it("should filter with the search", () => {
    let diagnostics: Array<Diagnostic> = [
      { type: "warning", message: "a message", step: 1 },
      { type: "success", message: "a message", step: 1 }
    ];
    let subject = mount(<DiagnosticsTraveller diagnostics={diagnostics} />);

    subject.find(DiagnosticsSearchField).at(0).prop("onChange")("z");

    expect(
      subject.find(DiagnosticsSelectors).at(0).prop("diagnostics")
    ).toEqual([]);
  });
});
