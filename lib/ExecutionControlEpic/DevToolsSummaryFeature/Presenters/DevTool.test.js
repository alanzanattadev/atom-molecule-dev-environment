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
});
