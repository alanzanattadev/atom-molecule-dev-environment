import React from "react";
import { shallow } from "enzyme";
import Message from "./Message";

describe("Message", () => {
  it("should display hello world!", () => {
    let subject = shallow(<Message>hello world!</Message>);

    expect(subject.text()).toBe("hello world!");
  });
});
