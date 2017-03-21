import React from "react";
import {mount} from "enzyme";
import DiagnosticDetails from "./DiagnosticDetails";

describe("DiagnosticDetails", () => {
  it("should display details", () => {
    let subject = mount(
      <DiagnosticDetails message="Error while reading this" />,
    );

    expect(subject.find("div").at(0).text()).toBe("Error while reading this");
  });
});
