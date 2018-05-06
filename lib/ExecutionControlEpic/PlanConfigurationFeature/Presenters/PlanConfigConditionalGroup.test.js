import "raf/polyfill";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount } from "enzyme";
import { PlanConfigConditionalGroup } from "./PlanConfigConditionalGroup";
import PlanConfigTextInputField from "./PlanConfigTextInputField";
import PlanConfigNumberInputField from "./PlanConfigNumberInputField";

Enzyme.configure({ adapter: new Adapter() });

describe("PlanConfigConditionalGroup", () => {
  it("should display the expression", () => {
    let subject = mount(
      <PlanConfigConditionalGroup
        expression={{
          type: "string",
          default: "ubuntu",
          description: "distrib",
        }}
        cases={{
          ubuntu: {
            type: "number",
            description: "version",
          },
          archlinux: null,
        }}
        value={{ expressionValue: "ubuntu", caseValue: 12 }}
      />,
    );

    expect(subject.find(PlanConfigTextInputField).length).toBe(1);
    expect(
      subject
        .find(PlanConfigTextInputField)
        .at(0)
        .prop("value"),
    ).toBe("ubuntu");
  });

  it("should display the case that matches with the expression", () => {
    let subject = mount(
      <PlanConfigConditionalGroup
        expression={{
          type: "string",
          default: "ubuntu",
          description: "distrib",
        }}
        value={{ expressionValue: "ubuntu", caseValue: 14 }}
        cases={{
          ubuntu: {
            type: "number",
            description: "version",
          },
          archlinux: null,
        }}
      />,
    );

    expect(subject.find(PlanConfigNumberInputField).length).toBe(1);
    expect(
      subject
        .find(PlanConfigNumberInputField)
        .at(0)
        .prop("value"),
    ).toBe(14);
  });

  it("shouldn't display the case if it doesn't match with the expression", () => {
    let subject = mount(
      <PlanConfigConditionalGroup
        expression={{
          type: "string",
          default: "ubuntu",
          description: "distrib",
        }}
        value={{ expressionValue: "archlinux" }}
        cases={{
          ubuntu: {
            type: "number",
            description: "version",
          },
          archlinux: null,
        }}
      />,
    );

    expect(subject.find(PlanConfigNumberInputField).length).toBe(0);
  });

  it("shouldn't crash if case not found", () => {
    mount(
      <PlanConfigConditionalGroup
        expression={{
          type: "string",
          default: "ubuntu",
          description: "distrib",
        }}
        value={{ expressionValue: "redhat" }}
        cases={{
          ubuntu: {
            type: "number",
            description: "version",
          },
          archlinux: null,
        }}
      />,
    );
  });
});
