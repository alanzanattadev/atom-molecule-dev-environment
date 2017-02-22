import React from "react";
import { mount } from "enzyme";
import PlanConfigSelectInputField from "./PlanConfigSelectInputField";

describe("PlanConfigSelectInputField", () => {
  it("should display the value", () => {
    let subject = mount(
      <PlanConfigSelectInputField
        value="myValue"
        options={[
          { value: "myvalue", description: "myValue" },
          { value: "myothervalue", description: "myOtherValue" }
        ]}
      />
    );

    expect(subject.find("select").length).toBe(1);
    expect(subject.find("select").prop("value")).toBe("myValue");
  });

  it("should call onChange props when an option is selected", () => {
    let spy = jest.fn();
    let subject = mount(
      <PlanConfigSelectInputField
        value="myValue"
        options={[
          { value: "myvalue", description: "myValue" },
          { value: "myothervalue", description: "myOtherValue" }
        ]}
        onChange={spy}
      />
    );

    subject
      .find("select")
      .at(0)
      .simulate("change", { target: { value: "myothervalue" } });

    expect(spy).toBeCalledWith("myothervalue");
  });

  it("should let the choice between the options from options props", () => {
    let subject = mount(
      <PlanConfigSelectInputField
        value="myValue"
        options={[
          { value: "myvalue", description: "myValue" },
          { value: "myothervalue", description: "myOtherValue" }
        ]}
      />
    );

    expect(subject.find("select").at(0).find("option").length).toBe(2);
    expect(
      subject
        .find("select")
        .at(0)
        .findWhere(
          elem => elem.type() == "option" && elem.text() == "myOtherValue"
        ).length
    ).toBe(1);
  });
});
