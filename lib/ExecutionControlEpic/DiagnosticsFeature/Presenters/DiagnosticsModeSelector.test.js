import React from "react";
import { shallow, mount } from "enzyme";
import DiagnosticMode from "./DiagnosticMode";
import DiagnosticsModeSelector from "./DiagnosticsModeSelector";

describe("DiagnosticsModeSelector", () => {
  it("should display 3 buttons", () => {
    let subject = mount(<DiagnosticsModeSelector />);

    expect(subject.find(DiagnosticMode).length).toBe(2);
  });

  it("should set selected props on inner selected mode", () => {
    let subject = shallow(<DiagnosticsModeSelector type="diagnostics" />);

    expect(subject.find(DiagnosticMode).length).toBe(2);
    expect(subject.find(DiagnosticMode).at(0).prop("active")).toBe(true);
    expect(subject.find(DiagnosticMode).at(1).prop("active")).toBe(false);
  });

  it("should call onClick on click", () => {
    let spy = jest.fn();
    let subject = mount(<DiagnosticsModeSelector type="logs" onClick={spy} />);

    subject.find(DiagnosticMode).at(1).simulate("click");

    expect(spy).toBeCalledWith("terminal");
  });
});
