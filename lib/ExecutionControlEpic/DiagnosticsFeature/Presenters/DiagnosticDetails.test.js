import "raf/polyfill";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount } from "enzyme";
import DiagnosticDetails from "./DiagnosticDetails";

Enzyme.configure({ adapter: new Adapter() });

describe("DiagnosticDetails", () => {
  // Skip test until we can handle Atom' API calls
  it.skip("should display details as the default Component", () => {
    let subject = mount(
      <DiagnosticDetails
        diagnostic={{
          path: "/test/path.to.js",
          message: "Error while reading this",
        }}
      />,
    );

    expect(
      subject
        .find("span")
        .at(1)
        .text(),
    ).toBe("path.to.js");
  });

  it("should display details as given Component", () => {
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
