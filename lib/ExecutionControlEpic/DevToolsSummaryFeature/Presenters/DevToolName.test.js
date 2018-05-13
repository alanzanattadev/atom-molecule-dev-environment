import "raf/polyfill";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import DevToolName from "./DevToolName";

Enzyme.configure({ adapter: new Adapter() });

describe("DevToolName", () => {
  it("should display devtool name", () => {
    let subject = shallow(<DevToolName>docker</DevToolName>);

    expect(
      subject
        .find("span")
        .at(0)
        .text(),
    ).toBe("docker");
  });

  it("should call onClick on click", () => {
    let spy = jest.fn();
    let subject = shallow(<DevToolName onClick={spy}>docker</DevToolName>);

    subject
      .find("div")
      .at(0)
      .simulate("click");

    expect(spy).toBeCalled();
  });
});
