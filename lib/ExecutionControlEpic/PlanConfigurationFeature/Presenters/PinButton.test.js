import "raf/polyfill";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount } from "enzyme";
import PinButton from "./PinButton";

Enzyme.configure({ adapter: new Adapter() });

describe("PinButton", () => {
  it("should display a pin icon", () => {
    let subject = mount(<PinButton />);

    expect(subject.find("button.icon-pin").length).toBe(1);
  });

  it("should call onClick on click", () => {
    let spy = jest.fn();
    let subject = mount(<PinButton onClick={spy} />);

    subject
      .find("button")
      .at(0)
      .simulate("click");

    expect(spy).toBeCalled();
  });
});
