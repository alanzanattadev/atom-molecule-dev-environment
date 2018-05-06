import "raf/polyfill";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import Message from "./Message";

Enzyme.configure({ adapter: new Adapter() });

describe("Message", () => {
  it("should display hello world!", () => {
    let subject = shallow(<Message>hello world!</Message>);

    expect(subject.text()).toBe("hello world!");
  });
});
