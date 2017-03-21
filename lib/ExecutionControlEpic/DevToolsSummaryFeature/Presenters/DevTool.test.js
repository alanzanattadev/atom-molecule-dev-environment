import React from "react";
import { mount } from "enzyme";
import DevTool from "./DevTool";

describe("DevTool", () => {
  it("should display tool icon", () => {
    let subject = mount(<DevTool iconUri="atom://myplugin/icon.png" />);

    expect(subject.find("img").length).toBe(1);
    expect(subject.find("img").at(0).prop("src")).toBe(
      "atom://myplugin/icon.png"
    );
  });

  it("should call onClick on click", () => {
    let spy = jest.fn();
    let subject = mount(
      <DevTool iconUri="atom://myplugin/icon.png" onClick={spy} />
    );

    subject.find("img").at(0).simulate("click");

    expect(spy).toBeCalled();
  });

  it("should display the plan color in a circle if color is defined", () => {
    let subject = mount(
      <DevTool iconUri="atom://myplugin/icon.png" color="#836BEB" />
    );

    expect(
      subject.findWhere(
        elem =>
          elem.type() == "span" &&
          elem.prop("style").backgroundColor == "#836BEB" &&
          elem.prop("style").borderRadius == '50%'
      ).length
    ).toBe(1);
  });

  it('should display the legend when showColor is defined', () => {
    let subject = mount(
      <DevTool iconUri="atom://myplugin/icon.png" color="#836BEB" showColor legend="server"/>
    );

    expect(
      subject.findWhere(
        elem =>
          elem.type() == "span" &&
          elem.prop("style").color == "#836BEB" &&
          elem.prop("children") == 'server'
      ).length
    ).toBe(1);
  });
});
