import React from "react";
import { shallow, mount } from "enzyme";
import LogsButton from "./LogsButton";
import DiagnosticsModeSelector from "./DiagnosticsModeSelector";
import OrganizedButton from "./OrganizedButton";

describe("DiagnosticsModeSelector", () => {
  it("should display 3 buttons", () => {
    let subject = mount(<DiagnosticsModeSelector />);

    expect(subject.find("button").length).toBe(3);
  });

  it("should set selected props on inner selected mode", () => {
    let subject = shallow(<DiagnosticsModeSelector type="logs" />);

    expect(subject.find(LogsButton).length).toBe(1);
    expect(subject.find(LogsButton).at(0).prop("selected")).toBe(true);
    expect(subject.find(OrganizedButton).at(0).prop("selected")).toBe(false);
  });

  it("should call onClick on click", () => {
    let spy = jest.fn();
    let subject = mount(<DiagnosticsModeSelector type="logs" onClick={spy} />);

    subject.find("button").at(2).simulate("click");

    expect(spy).toBeCalledWith("terminal");
  });
});
