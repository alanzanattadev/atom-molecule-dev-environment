import React from "react";
import { shallow, mount } from "enzyme";
import DiagnosticsSearchField from "./DiagnosticsSearchField";

describe("DiagnosticsSearchField", () => {
  it("should display a search input field", () => {
    let subject = shallow(<DiagnosticsSearchField value="salut" />);

    expect(subject.find('input[type="text"]').length).toBe(1);
    expect(subject.find('input[type="text"]').at(0).prop("value")).toBe(
      "salut"
    );
  });

  it("should call onChange on input change", () => {
    let spy = jest.fn();
    let subject = shallow(<DiagnosticsSearchField onChange={spy} />);

    subject
      .find('input[type="text"]')
      .at(0)
      .simulate("change", { target: { value: "ok" } });

    expect(spy).toBeCalledWith("ok");
  });
});
