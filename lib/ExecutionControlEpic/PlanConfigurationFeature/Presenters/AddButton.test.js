import "raf/polyfill";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount } from "enzyme";
import AddButton from "./AddButton";

Enzyme.configure({ adapter: new Adapter() });

describe("AddButton", () => {
  it("should display an icon", () => {
    let subject = mount(<AddButton />);

    expect(
      subject
        .find("button")
        .at(0)
        .hasClass("icon-plus"),
    ).toBe(true);
  });

  it("should call onClick props on click", () => {
    let spy = jest.fn();
    let subject = mount(<AddButton onClick={spy} />);

    subject
      .find("button")
      .at(0)
      .simulate("click");

    expect(spy).toBeCalled();
  });
});
