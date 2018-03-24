import "raf/polyfill";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount } from "enzyme";
import DiagnosticDetails from "./DiagnosticDetails";

Enzyme.configure({ adapter: new Adapter() });

describe("DiagnosticDetails", () => {
  it("should display details as string", () => {
    let subject = mount(
      <DiagnosticDetails
        diagnostic={{ message: "Error while reading this" }}
      />,
    );

    expect(
      subject
        .find("div")
        .at(0)
        .text(),
    ).toBe("Error while reading this");
  });

  it("should display details as Component", () => {
    let subject = mount(
      <DiagnosticDetails
        diagnostic={{ message: "Error while reading this" }}
        view={() => <span>Error while reading this</span>}
      />,
    );

    expect(
      subject
        .find("span")
        .at(0)
        .text(),
    ).toBe("Error while reading this");
  });
});
