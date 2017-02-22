import React from "react";
import { shallow, mount } from "enzyme";
import Arrow from "./Arrow";
import DiagnosticsSelector from "./DiagnosticsSelector";

describe("DiagnosticsSelector", () => {
  it("should display only 1 if one diagnostic of type exists", () => {
    let subject = shallow(
      <DiagnosticsSelector index={0} of={1} type="warning" />
    );

    expect(subject.text()).toBe("1");
    expect(subject.find(Arrow).length).toBe(0);
  });

  it(
    "should display index and total diagnostics number of type with arrows",
    () => {
      let subject = shallow(
        <DiagnosticsSelector index={1} of={4} type="warning" />
      );

      expect(subject.find("span").at(0).text()).toBe("2 of 4");
      expect(subject.find(Arrow).length).toBe(2);
    }
  );

  it("should call onBack on back arrow click", () => {
    let spy = jest.fn();
    let subject = mount(
      <DiagnosticsSelector index={1} of={4} type="warning" onBack={spy} />
    );

    subject.find(Arrow).at(0).simulate("click");

    expect(spy).toBeCalled();
  });

  it("should call onForward on forward arrow click", () => {
    let spy = jest.fn();
    let subject = mount(
      <DiagnosticsSelector index={1} of={4} type="warning" onForward={spy} />
    );

    subject.find(Arrow).at(1).simulate("click");

    expect(spy).toBeCalled();
  });

  it("should call onClick on number click", () => {
    let spy = jest.fn();
    let subject = mount(
      <DiagnosticsSelector index={1} of={4} type="warning" onClick={spy} />
    );

    subject.find("span").at(0).simulate("click");

    expect(spy).toBeCalled();
  });
});
