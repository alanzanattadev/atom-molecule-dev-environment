"use babel";
// @flow

import "raf/polyfill";
import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import EslintDiagnostic from "./EslintDiagnostic";
import Enzyme, { shallow } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

describe("EslintDiagnostic", () => {
  it("should display path of diagnostic", () => {
    const path = "/home/folder/file";
    const message = {
      ruleId: "no-unused-vars",
      severity: 2,
      message: "'addOne' is defined but never used.",
      line: 1,
      column: 10,
      nodeType: "Identifier",
      source: "function addOne(i) {",
    };
    let subject = shallow(
      <EslintDiagnostic
        path={path}
        message={message.message}
        severity={message.severity}
        source={message.source}
      />,
    );

    expect(subject.find("h3").text()).toEqual("/home/folder/file");
    expect(subject.find("pre code").text()).toEqual("function addOne(i) {");
  });
});
