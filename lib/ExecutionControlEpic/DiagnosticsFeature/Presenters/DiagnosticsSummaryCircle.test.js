import React from "react";
import { shallow } from "enzyme";
import DiagnosticsSummaryCircle from "./DiagnosticsSummaryCircle";

describe("DiagnosticsSummaryCircle", () => {
  it("should display the number of diagnostics of this type", () => {
    let subject = shallow(<DiagnosticsSummaryCircle number={5} />);

    expect(subject.text()).toBe("5");
  });

  it("should call onClick on click", () => {
    let spy = jest.fn();
    let subject = shallow(
      <DiagnosticsSummaryCircle number={5} onClick={spy} />,
    );

    subject.find("div").at(0).simulate("click", {});

    expect(spy).toBeCalled();
  });
});
