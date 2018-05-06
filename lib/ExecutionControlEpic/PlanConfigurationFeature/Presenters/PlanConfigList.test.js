import "raf/polyfill";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { PlanConfigList } from "./PlanConfigList";

Enzyme.configure({ adapter: new Adapter() });

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
