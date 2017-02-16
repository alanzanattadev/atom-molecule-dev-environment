import React from "react";
import { mount } from "enzyme";
import PlanConfigConditionalGroup from "./PlanConfigConditionalGroup";
import PlanConfigTextInputField from "./PlanConfigTextInputField";
import PlanConfigNumberInputField from "./PlanConfigNumberInputField";
import PlanConfigPart from "./PlanConfigPart";

describe("PlanConfigConditionalGroup", () => {
  it("should display the expression", () => {
    let subject = mount(
      <PlanConfigConditionalGroup
        expression={{
          type: "string",
          default: "ubuntu",
          description: "distrib"
        }}
        cases={{
          ubuntu: {
            type: "number",
            description: "version"
          },
          archlinux: null
        }}
        value={{ expressionValue: "ubuntu", caseValue: 12 }}
      />
    );

    expect(subject.find(PlanConfigTextInputField).length).toBe(1);
    expect(subject.find(PlanConfigTextInputField).at(0).prop("value")).toBe(
      "ubuntu"
    );
  });

  it("should display the case that matches with the expression", () => {
    let subject = mount(
      <PlanConfigConditionalGroup
        expression={{
          type: "string",
          default: "ubuntu",
          description: "distrib"
        }}
        value={{ expressionValue: "ubuntu", caseValue: 14 }}
        cases={{
          ubuntu: {
            type: "number",
            description: "version"
          },
          archlinux: null
        }}
      />
    );

    expect(subject.find(PlanConfigNumberInputField).length).toBe(1);
    expect(subject.find(PlanConfigNumberInputField).at(0).prop("value")).toBe(
      14
    );
  });

  it(
    "shouldn't display the case if it doesn't match with the expression",
    () => {
      let subject = mount(
        <PlanConfigConditionalGroup
          expression={{
            type: "string",
            default: "ubuntu",
            description: "distrib"
          }}
          value={{ expressionValue: "archlinux" }}
          cases={{
            ubuntu: {
              type: "number",
              description: "version"
            },
            archlinux: null
          }}
        />
      );

      expect(subject.find(PlanConfigNumberInputField).length).toBe(0);
    }
  );

  it("shouldn't crash if case not found", () => {
    let subject = mount(
      <PlanConfigConditionalGroup
        expression={{
          type: "string",
          default: "ubuntu",
          description: "distrib"
        }}
        value={{ expressionValue: "redhat" }}
        cases={{
          ubuntu: {
            type: "number",
            description: "version"
          },
          archlinux: null
        }}
      />
    );
  });

  it("should call onChange when expression change", () => {
    let spy = jest.fn();
    let subject = mount(
      <PlanConfigConditionalGroup
        expression={{
          type: "string",
          default: "ubuntu",
          description: "distrib"
        }}
        value={{ expressionValue: "redhat", caseValue: null }}
        cases={{
          ubuntu: {
            type: "number",
            description: "version"
          },
          archlinux: null
        }}
        onChange={spy}
      />
    );

    subject.find(PlanConfigPart).at(0).prop("onChange")("fedora");

    expect(spy).toBeCalledWith({ expressionValue: "fedora", caseValue: null });
  });

  it("should call onChange when matching case change", () => {
    let spy = jest.fn();
    let subject = mount(
      <PlanConfigConditionalGroup
        expression={{
          type: "string",
          default: "ubuntu",
          description: "distrib"
        }}
        value={{ expressionValue: "ubuntu", caseValue: 14 }}
        cases={{
          ubuntu: {
            type: "number",
            description: "version"
          },
          archlinux: null
        }}
        onChange={spy}
      />
    );

    subject.find(PlanConfigPart).at(1).prop("onChange")(16);

    expect(spy).toBeCalledWith({ expressionValue: "ubuntu", caseValue: 16 });
  });

  it(
    "should change value with the default case value when another case is used",
    () => {
      let spy = jest.fn();
      let subject = mount(
        <PlanConfigConditionalGroup
          expression={{
            type: "string",
            default: "archlinux",
            description: "distrib"
          }}
          value={{ expressionValue: "archlinux", caseValue: 14 }}
          cases={{
            ubuntu: {
              type: "number",
              default: 16,
              description: "version"
            },
            archlinux: null
          }}
          onChange={spy}
        />
      );

      subject.find(PlanConfigPart).at(0).prop("onChange")("ubuntu");

      expect(spy).toBeCalledWith({ expressionValue: "ubuntu", caseValue: 16 });
    }
  );
});
