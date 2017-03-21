import React from "react";
import {shallow} from "enzyme";
import Branch from "./Branch";

describe("Branch", () => {
  it("should display branch name", () => {
    let subject = shallow(<Branch name="master" />);

    expect(
      subject.findWhere(comp => comp.text() == "master").length,
    ).toBeGreaterThan(0);
  });
});
