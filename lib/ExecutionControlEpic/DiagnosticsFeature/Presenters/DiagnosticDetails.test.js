import React from "react";
import { mount } from "enzyme";
import DiagnosticDetails from "./DiagnosticDetails";

describe("DiagnosticDetails", () => {
  it("should display details as string", () => {
    let subject = mount(
      <DiagnosticDetails message="Error while reading this" />,
    );

    expect(subject.find("div").at(0).text()).toBe("Error while reading this");
  });

  it("should display details as Component", () => {
    let subject = mount(
      <DiagnosticDetails
        message={"Error while reading this"}
        view={() => <span>Error while reading this</span>}
      />,
    );

    expect(subject.find("span").at(0).text()).toBe("Error while reading this");
  });
});
