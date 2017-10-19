"use babel";
// @flow

import * as React from "react";
import { shallow } from "enzyme";
import DevToolWithDiagnostics from "./DevToolWithDiagnostics";
import DevToolsWithDiagnostics from "./DevToolsWithDiagnostics";
import type { DevToolWithDiagnostics as DevToolWithDiagnosticsType } from "../Types/types.js.flow";

describe("DevToolsWithDiagnostics", () => {
  let tools: Array<DevToolWithDiagnosticsType> = [
    {
      id: "1",
      name: "gulp",
      iconUri: "atom://gulp/icon.png",
      successes: 2,
      errors: 1,
      warnings: 5,
      infos: 0,
      planColor: "red",
      legend: "build",
      index: 5,
    },
    {
      id: "1",
      name: "jest",
      iconUri: "atom://jest/icon.png",
      successes: 1,
      errors: 0,
      warnings: 6,
      infos: 0,
      planColor: "blue",
      legend: "test",
    },
    {
      id: "3",
      name: "docker",
      iconUri: "atom://docker/icon.png",
      successes: 1,
      errors: 5,
      warnings: 2,
      infos: 3,
      planColor: "green",
      legend: "run",
    },
  ];

  it("should display devTools with diagnostics", () => {
    let subject = shallow(<DevToolsWithDiagnostics tools={tools} showColor />);

    expect(subject.find(DevToolWithDiagnostics).length).toBe(3);
    expect(
      subject
        .find(DevToolWithDiagnostics)
        .at(0)
        .prop("errors"),
    ).toBe(1);
    expect(
      subject
        .find(DevToolWithDiagnostics)
        .at(0)
        .prop("warnings"),
    ).toBe(5);
    expect(
      subject
        .find(DevToolWithDiagnostics)
        .at(0)
        .prop("infos"),
    ).toBe(0);
    expect(
      subject
        .find(DevToolWithDiagnostics)
        .at(0)
        .prop("successes"),
    ).toBe(2);
    expect(
      subject
        .find(DevToolWithDiagnostics)
        .at(0)
        .prop("iconUri"),
    ).toBe("atom://gulp/icon.png");
    expect(
      subject
        .find(DevToolWithDiagnostics)
        .at(0)
        .prop("name"),
    ).toBe("gulp");
    expect(
      subject
        .find(DevToolWithDiagnostics)
        .at(0)
        .prop("planColor"),
    ).toBe("red");
    expect(
      subject
        .find(DevToolWithDiagnostics)
        .at(0)
        .prop("showColor"),
    ).toBe(true);
    expect(
      subject
        .find(DevToolWithDiagnostics)
        .at(0)
        .prop("legend"),
    ).toBe("build");
    expect(
      subject
        .find(DevToolWithDiagnostics)
        .at(0)
        .prop("index"),
    ).toBe(5);
  });

  it("should call onToolDiagnosticsClick with tool and type as parameters on diagnostic click", () => {
    let spy = jest.fn();
    let subject = shallow(
      <DevToolsWithDiagnostics tools={tools} onToolDiagnosticsClick={spy} />,
    );

    subject
      .find(DevToolWithDiagnostics)
      .at(1)
      .prop("onDiagnosticClick")("warning");

    expect(spy).toBeCalledWith(tools[1], "warning");
  });

  it("should call onToolSettingsClick with tool as parameter on tool click", () => {
    let spy = jest.fn();
    let subject = shallow(
      <DevToolsWithDiagnostics tools={tools} onToolSettingsClick={spy} />,
    );

    subject
      .find(DevToolWithDiagnostics)
      .at(1)
      .prop("onSettingsClick")();

    expect(spy).toBeCalledWith(tools[1]);
  });

  it("should call onToolLogsClick with tool as parameter on tool logs click", () => {
    let spy = jest.fn();
    let subject = shallow(
      <DevToolsWithDiagnostics tools={tools} onToolLogsClick={spy} />,
    );

    subject
      .find(DevToolWithDiagnostics)
      .at(1)
      .prop("onLogsClick")();

    expect(spy).toBeCalledWith(tools[1]);
  });
});
