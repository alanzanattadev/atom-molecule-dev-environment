import React from "react";
import { mount } from "enzyme";
import PlanConfigPart from "./PlanConfigPart";
import PlanConfigSelectInputField from "./PlanConfigSelectInputField";
import PlanConfigGroup from "./PlanConfigGroup";
import PlanConfigTextInputField from "./PlanConfigTextInputField";
import PlanConfigConditionalGroup from "./PlanConfigConditionalGroup";
import PlanConfigNumberInputField from "./PlanConfigNumberInputField";
import PlanConfigCheckboxInputField from "./PlanConfigCheckboxInputField";
import PlanConfigList from "./PlanConfigList";

describe("PlanConfigPart", () => {
  it("should display a PlanConfigSelectInputField when type is enum", () => {
    let subject = mount(
      <PlanConfigPart
        type="enum"
        default="on-failure"
        value="on-failure"
        enum={[
          {
            value: "no",
            description: "No",
          },
          {
            value: "always",
            description: "Always",
          },
          {
            value: "on-failure",
            description: "On Failure",
          },
          {
            value: "unless-stopped",
            description: "Unless Stopped",
          },
        ]}
      />,
    );

    expect(subject.find(PlanConfigSelectInputField).length).toBe(1);
    expect(
      subject.find(PlanConfigSelectInputField).prop("options"),
    ).toBeDefined();
    expect(subject.find(PlanConfigSelectInputField).prop("default")).toBe(
      "on-failure",
    );
    expect(subject.find(PlanConfigSelectInputField).prop("value")).toBe(
      "on-failure",
    );
  });

  it("should display a PlanConfigGroup when type is object", () => {
    let subject = mount(
      <PlanConfigPart
        type="object"
        schemas={{
          image: { type: "string" },
          command: { type: "string" },
        }}
        value={{ image: "ubuntu", command: "ls" }}
      />,
    );

    expect(subject.find(PlanConfigGroup).length).toBe(1);
    expect(subject.find(PlanConfigGroup).at(0).prop("schemas")).toBeDefined();
    expect(subject.find(PlanConfigGroup).at(0).prop("value")).toBeDefined();
  });

  it("should display a PlanConfigList when type is array", () => {
    let values = ["coucou"];
    let subject = mount(
      <PlanConfigPart
        type="array"
        items={{ type: "string" }}
        default=""
        value={values}
      />,
    );

    expect(subject.find(PlanConfigList).length).toBe(1);
    expect(subject.find(PlanConfigList).at(0).prop("items")).toEqual({
      type: "string",
    });
    expect(subject.find(PlanConfigList).at(0).prop("default")).toBe("");
    expect(subject.find(PlanConfigList).at(0).prop("value")).toBe(values);
  });

  it("should display a PlanConfigTextInputField when type is string", () => {
    let subject = mount(<PlanConfigPart type="string" value="my value" />);

    expect(subject.find(PlanConfigTextInputField).length).toBe(1);
    expect(subject.find(PlanConfigTextInputField).prop("value")).toBe(
      "my value",
    );
  });

  it("should display a PlanConfigCheckBoxInputField when type is boolean", () => {
    let subject = mount(<PlanConfigPart type="boolean" value={true} />);

    expect(subject.find(PlanConfigCheckboxInputField).length).toBe(1);
    expect(subject.find(PlanConfigCheckboxInputField).prop("value")).toBe(true);
  });

  it("should display a PlanConfigNumberInputField when type is number", () => {
    let subject = mount(<PlanConfigPart type="number" value={3} />);

    expect(subject.find(PlanConfigNumberInputField).length).toBe(1);
    expect(subject.find(PlanConfigNumberInputField).at(0).prop("value")).toBe(
      3,
    );
  });

  it("should display a PlanConfigConditionalGroup when type is conditional", () => {
    let spy = jest.fn();
    let subject = mount(
      <PlanConfigPart
        type="conditional"
        value={{ expressionValue: "ubuntu", caseValue: 14 }}
        expression={{
          type: "string",
          default: "ubuntu",
          description: "distribution",
        }}
        cases={{
          ubuntu: {
            type: "number",
            default: "16",
          },
          fedora: {
            type: "number",
            default: "24",
          },
        }}
        onChange={spy}
      />,
    );

    subject.find(PlanConfigConditionalGroup).at(0).prop("onChange")({
      expressionValue: "fedora",
      caseValue: 23,
    });

    expect(subject.find(PlanConfigConditionalGroup).length).toBe(1);
    expect(
      subject.find(PlanConfigConditionalGroup).at(0).prop("value"),
    ).toEqual({ expressionValue: "ubuntu", caseValue: 14 });
    expect(spy).toBeCalledWith({ expressionValue: "fedora", caseValue: 23 });
  });
});
