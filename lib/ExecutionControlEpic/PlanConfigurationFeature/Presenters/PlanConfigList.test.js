import React from "react";
import { shallow } from "enzyme";
import { PlanConfigList } from "./PlanConfigList";

describe("PlanConfigList", () => {
  let spy = jest.fn();
  let subject = shallow(
    <PlanConfigList
      values={[
        { name: "NODE_PLAN", value: "web" },
        { name: "NODE_ENV", value: "dev" },
      ]}
      items={{
        type: "object",
        schemas: {
          name: {
            type: "string",
            default: "",
            placeholder: "name",
          },
          value: {
            type: "string",
            default: "",
            placeholder: "value",
          },
        },
      }}
      onChange={spy}
    />,
  );
  it("should display the values", () => {
    expect(subject).toMatchSnapshot();
  });
});
