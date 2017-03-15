import React from "react";
import { mount } from "enzyme";
import PlanConfigList from "./PlanConfigList";
import PlanConfigPart from "./PlanConfigPart";
import AddButton from "./AddButton";

describe("PlanConfigList", () => {
  let spy = jest.fn();
  let subject = mount(
    <PlanConfigList
      values={[
        { name: "NODE_PLAN", value: "web" },
        { name: "NODE_ENV", value: "dev" }
      ]}
      items={{
        type: "object",
        schemas: {
          name: {
            type: "string",
            default: "",
            placeholder: "name"
          },
          value: {
            type: "string",
            default: "",
            placeholder: "value"
          }
        }
      }}
      onChange={spy}
    />
  );
  it("should display the values", () => {
    expect(subject.find(PlanConfigPart).length).toBe(2); // nested parts
    expect(subject.find(PlanConfigPart).at(1).prop("value")).toEqual({
      name: "NODE_ENV",
      value: "dev"
    });
    expect(subject.find(PlanConfigPart).at(1).prop("type")).toBe("object");
    expect(subject.find(PlanConfigPart).at(1).prop("schemas")).toEqual({
      name: {
        type: "string",
        default: "",
        placeholder: "name"
      },
      value: {
        type: "string",
        default: "",
        placeholder: "value"
      }
    });
  });

  it("should display an add button", () => {
    expect(subject.find(AddButton).length).toBe(1);
  });

  it("should add a value when button is clicked", () => {
    subject.find(AddButton).at("0").simulate("click", {});

    expect(spy).toBeCalledWith([
      { name: "NODE_PLAN", value: "web" },
      { name: "NODE_ENV", value: "dev" },
      { name: "", value: "" }
    ]);
  });
});
