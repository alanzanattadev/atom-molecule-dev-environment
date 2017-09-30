import React from "react";
import { mount } from "enzyme";
import AddButton from "./AddButton";

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
