import React from "react";
import { mount } from "enzyme";
import { PackageConfigContainer } from "./PackageConfig";

describe("PackageConfig", () => {
  it("should select the first package at mount", () => {
    const spy = jest.fn();
    mount(<PackageConfigContainer onChange={spy} packages={["value1"]} />);

    expect(spy).toHaveBeenCalledWith("value1");
  });

  it("should select the newley received package ", () => {
    const spy = jest.fn();
    let subject = mount(
      <PackageConfigContainer packages={[]} onChange={spy} />,
    );

    expect(spy).not.toHaveBeenCalled();
    subject.setProps({ packages: ["value2"], onChange: spy });
    expect(spy).toHaveBeenCalledWith("value2");
  });
});
