import "raf/polyfill";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import DevTool from "./DevTool";
import DevTools from "./DevTools";

Enzyme.configure({ adapter: new Adapter() });

describe("DevTools", () => {
  let tools = [
    {
      id: "tool1",
      name: "docker",
      iconUri: "atom://myplugin1/icon.png",
    },
    {
      id: "tool2",
      name: "shell",
      iconUri: "atom://myplugin2/icon.png",
    },
    {
      id: "tool3",
      name: "nightwatch",
      iconuri: "atom://myplugin3/icon.png",
    },
  ];
  it("should display the tools", () => {
    let subject = shallow(<DevTools tools={tools} />);

    expect(subject.find(DevTool).length).toBe(3);
    expect(
      subject
        .find(DevTool)
        .at(1)
        .prop("iconUri"),
    ).toBe("atom://myplugin2/icon.png");
  });

  it("should call onClick with the right tool on click", () => {
    let spy = jest.fn();
    let subject = shallow(<DevTools tools={tools} onClick={spy} />);

    subject
      .find(DevTool)
      .at(1)
      .prop("onClick")();

    expect(spy).toBeCalledWith(tools[1]);
  });
});
