import "raf/polyfill";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount } from "enzyme";
import { PlanConfigCheckboxInputField } from "./PlanConfigCheckboxInputField";

Enzyme.configure({ adapter: new Adapter() });

describe("PlanConfigCheckboxInputField", () => {
  it("should display its value", () => {
    let subject = mount(<PlanConfigCheckboxInputField value={true} />);

    expect(
      subject
        .find('input[type="checkbox"]')
        .at(0)
        .prop("checked"),
    ).toBe(true);
  });

  it("should change its value on onChange", () => {
    let spy = jest.fn();
    let subject = mount(
      <PlanConfigCheckboxInputField value={true} onChange={spy} />,
    );

    subject
      .find('input[type="checkbox"]')
      .at(0)
      .simulate("change", { target: { checked: false } });

    expect(spy).toHaveBeenCalledWith(false);
  });

  it("should display its label", () => {
    let subject = mount(
      <PlanConfigCheckboxInputField
        value={true}
        onChange={() => {}}
        label="myCheckbox"
      />,
    );

    expect(subject.find("label").length).toBe(1);
    expect(
      subject
        .find("label")
        .at(0)
        .text(),
    ).toBe("myCheckbox");
  });
});
