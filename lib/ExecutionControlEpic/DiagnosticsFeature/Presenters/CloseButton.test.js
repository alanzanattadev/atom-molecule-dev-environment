import React from "react";
import { shallow, mount } from "enzyme";
import CloseButton from "./CloseButton";

describe("CloseButton", () => {
  it("should display a close icon", () => {
    let subject = shallow(<CloseButton />);

    expect(subject.find("button").length).toBe(1);
  });

  it("should call onClick on click", () => {
    let spy = jest.fn();
    let subject = shallow(<CloseButton onClick={spy} />);

    subject.find("button").at(0).simulate("click");

    expect(spy).toBeCalled();
  });
});
