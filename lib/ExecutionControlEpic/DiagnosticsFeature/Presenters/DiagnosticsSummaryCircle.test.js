import "raf/polyfill";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount, shallow } from "enzyme";
import DiagnosticsSummaryCircle from "./DiagnosticsSummaryCircle";

Enzyme.configure({ adapter: new Adapter() });

describe("DiagnosticsSummaryCircle", () => {
  it("should display the number of diagnostics of this type", () => {
    let subject = shallow(<DiagnosticsSummaryCircle number={5} />);

    expect(subject).toMatchSnapshot();
  });

  it("should call onClick on click", () => {
    let spy = jest.fn();
    let subject = mount(<DiagnosticsSummaryCircle number={5} onClick={spy} />);

    subject
      .find("div")
      .at(0)
      .simulate("click", {});

    expect(spy).toBeCalled();
  });
});
