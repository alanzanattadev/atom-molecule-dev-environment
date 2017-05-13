"use babel";
// @flow

import React from "react";
import { shallow } from "enzyme";
import DiagnosticsSelector from "./DiagnosticsSelector";
import DiagnosticsSelectors from "./DiagnosticsSelectors";
import type { Diagnostic } from "../Types/types.js.flow";

describe("DiagnosticsSelectors", () => {
  it("should display warnings and errors when there is no infos and successes", () => {
    let diagnostics: Array<Diagnostic> = [
      {
        type: "error",
        message: "a message",
        step: 1,
      },
      {
        type: "warning",
        message: "a message",
        step: 1,
      },
      {
        type: "warning",
        message: "a message",
        step: 1,
      },
    ];
    let spy = jest.fn();
    let subject = shallow(
      <DiagnosticsSelectors
        diagnostics={diagnostics}
        diagnosticType="warning"
        onSelected={spy}
        diagnosticIndex={0}
      />,
    );

    expect(subject.find(DiagnosticsSelector).length).toBe(2);
    expect(subject.find(DiagnosticsSelector).at(0).prop("type")).toBe(
      "warning",
    );
    expect(subject.find(DiagnosticsSelector).at(0).prop("of")).toBe(2);
    expect(subject.find(DiagnosticsSelector).at(0).prop("index")).toBe(0);
    expect(subject.find(DiagnosticsSelector).at(1).prop("type")).toBe("error");
  });

  it("should display infos and successes when there is no warnings and errors", () => {
    let diagnostics: Array<Diagnostic> = [
      {
        type: "info",
        message: "a message",
        step: 1,
      },
      {
        type: "success",
        message: "a message",
        step: 1,
      },
      {
        type: "success",
        message: "a message",
        step: 1,
      },
    ];
    let spy = jest.fn();
    let subject = shallow(
      <DiagnosticsSelectors
        diagnostics={diagnostics}
        diagnosticType="warning"
        onSelected={spy}
        diagnosticIndex={0}
      />,
    );

    expect(subject.find(DiagnosticsSelector).length).toBe(2);
    expect(subject.find(DiagnosticsSelector).at(0).prop("type")).toBe(
      "success",
    );
    expect(subject.find(DiagnosticsSelector).at(1).prop("type")).toBe("info");
  });

  it("should call onSelected with type and index when a back arrow is clicked", () => {
    let diagnostics: Array<Diagnostic> = [
      {
        type: "info",
        message: "a message",
        step: 1,
      },
      {
        type: "success",
        message: "a message",
        step: 1,
      },
      {
        type: "success",
        message: "a message",
        step: 1,
      },
    ];
    let spy = jest.fn();
    let subject = shallow(
      <DiagnosticsSelectors
        diagnostics={diagnostics}
        onSelected={spy}
        diagnosticIndex={1}
        diagnosticType="success"
      />,
    );

    subject.find(DiagnosticsSelector).at(0).prop("onBack")();

    expect(spy).toBeCalledWith("success", 0);
  });

  it("should call onSelected with type and index when a forward arrow is clicked", () => {
    let diagnostics: Array<Diagnostic> = [
      {
        type: "info",
        message: "a message",
        step: 1,
      },
      {
        type: "success",
        message: "a message",
        step: 1,
      },
      {
        type: "success",
        message: "a message",
        step: 1,
      },
    ];
    let spy = jest.fn();
    let subject = shallow(
      <DiagnosticsSelectors
        diagnostics={diagnostics}
        onSelected={spy}
        diagnosticIndex={0}
        diagnosticType="success"
      />,
    );

    subject.find(DiagnosticsSelector).at(0).prop("onForward")();

    expect(spy).toBeCalledWith("success", 1);
  });

  it("should call onSelected with type and index when a selector is clicked", () => {
    let diagnostics: Array<Diagnostic> = [
      {
        type: "info",
        message: "a message",
        step: 1,
      },
      {
        type: "success",
        message: "a message",
        step: 1,
      },
      {
        type: "success",
        message: "a message",
        step: 1,
      },
    ];
    let spy = jest.fn();
    let subject = shallow(
      <DiagnosticsSelectors
        diagnostics={diagnostics}
        onSelected={spy}
        diagnosticIndex={0}
        diagnosticType="success"
      />,
    );

    subject.find(DiagnosticsSelector).at(1).prop("onClick")();

    expect(spy).toBeCalledWith("info", 0);
  });
});
