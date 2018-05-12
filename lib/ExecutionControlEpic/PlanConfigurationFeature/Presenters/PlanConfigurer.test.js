import "raf/polyfill";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import PlanConfigPart from "./PlanConfigPart";
import PlanConfigurer from "./PlanConfigurer";
import PlanConfigTextInputField from "./PlanConfigTextInputField";
import AddButton from "./AddButton";
import PackageConfig from "./PackageConfig";

Enzyme.configure({ adapter: new Adapter() });

describe("PlanConfigurer", () => {
  it("should display the config UI", () => {
    let subject = shallow(<PlanConfigurer config={{ type: "number" }} />);

    expect(subject.find(PlanConfigPart).length).not.toBe(0);
  });

  it("should display an add button", () => {
    let subject = shallow(<PlanConfigurer config={{ type: "string" }} />);

    expect(subject.find(AddButton).length).toBe(1);
  });

  it("should display a text input field for plan name", () => {
    let subject = shallow(<PlanConfigurer config={{ type: "number" }} />);

    expect(subject.find(PlanConfigTextInputField).length).toBe(1);
  });

  it("should have updated packages list", () => {
    let packagesListEmpty = [];
    let packagesListUpdatedTest = [
      { name: "test1", path: "./path/test/test1.json", type: "file" },
      { name: "test2", path: "./path/test/test2.json", type: "file" },
      { name: "test3", path: "./path/test/test3.json", type: "file" },
    ];

    let subject = mount(<PlanConfigurer package={{ packagesListEmpty }} />);

    subject.setProps({ packages: packagesListUpdatedTest });
    expect(subject.find(PackageConfig).prop("packages")).toBe(
      packagesListUpdatedTest,
    );
  });
});
