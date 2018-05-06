import "raf/polyfill";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount } from "enzyme";
import { PlanConfigTextInputField } from "./PlanConfigTextInputField";

Enzyme.configure({ adapter: new Adapter() });

describe("PlanConfigTextInputField", () => {
  it("should display the value", () => {
    let subject = mount(<PlanConfigTextInputField value={"alan"} />);

    expect(
      subject
        .find('input[type="text"]')
        .at(0)
        .prop("value"),
    ).toBe("alan");
  });

  it("should call onChange when a key is pressed", () => {
    let spy = jest.fn();
    let subject = mount(
      <PlanConfigTextInputField value={"alan"} onChange={spy} />,
    );

    subject
      .find('input[type="text"]')
      .at(0)
      .simulate("change", { target: { value: "new value" } });

    expect(spy).toHaveBeenCalledWith("new value");
  });
});
