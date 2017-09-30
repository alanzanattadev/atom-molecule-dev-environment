import React from "react";
import { mount } from "enzyme";
import PinButton from "./PinButton";

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
