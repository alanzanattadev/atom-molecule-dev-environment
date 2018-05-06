import "raf/polyfill";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount } from "enzyme";
import UnpinButton from "./UnpinButton";

Enzyme.configure({ adapter: new Adapter() });

describe("UnpinButton", () => {
  it("should display an unpin icon", () => {
    let subject = mount(<UnpinButton />);

    expect(subject.find("button.icon-remove-close").length).toBe(1);
  });

  it("should call onClick on click", () => {
    let spy = jest.fn();
    let subject = mount(<UnpinButton onClick={spy} />);

    subject
      .find("button")
      .at(0)
      .simulate("click");

    expect(spy).toBeCalled();
  });
});
