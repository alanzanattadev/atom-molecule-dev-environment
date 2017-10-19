"use babel";
// @flow

import * as React from "react";
import { mount } from "enzyme";
import Plan from "./Plan";
import Plans from "./Plans";
import type { PlanConfig } from "../Types/types.js.flow";
import { StyleRoot } from "radium";
import electron from "electron";

const remote = electron.remote;

beforeEach(() => {
  // $FlowFixMe
  remote.resetMenu();
});

describe("Plans", () => {
  let plans: Array<PlanConfig> = [
    {
      name: "build",
      tool: {
        id: "gulp",
        name: "gulp",
        iconUri: "atom://molecule-gulp/icon.png",
      },
      config: "build",
      pinned: false,
      state: "running",
    },
    {
      name: "watch",
      tool: {
        id: "gulp",
        name: "gulp",
        iconUri: "atom://molecule-gulp/icon.png",
      },
      config: "watch",
      pinned: false,
    },
    {
      name: "clean",
      tool: {
        id: "gulp",
        name: "gulp",
        iconUri: "atom://molecule-gulp/icon.png",
      },
      config: "clean",
      pinned: false,
    },
  ];
  it("should display the plans", () => {
    let subject = mount(
      <StyleRoot>
        <Plans plans={plans} />
      </StyleRoot>,
    );

    expect(subject.find(Plan).length).toBe(3);
    expect(
      subject
        .find(Plan)
        .at(0)
        .prop("iconUri"),
    ).toBe("atom://molecule-gulp/icon.png");
    expect(
      subject
        .find(Plan)
        .at(0)
        .prop("name"),
    ).toBe("build");
    expect(
      subject
        .find(Plan)
        .at(0)
        .prop("state"),
    ).toBe("running");
  });

  it("should call onPlanClick with the right plan on plan click", () => {
    let spy = jest.fn();
    let subject = mount(
      <StyleRoot>
        <Plans plans={plans} onPlanClick={spy} />
      </StyleRoot>,
    );

    subject
      .find(Plan)
      .at(1)
      .simulate("click");

    expect(spy).toBeCalled();
    expect(spy.mock.calls[0][0]).toEqual(plans[1]);
  });

  it("should pass pinnable props to every plans", () => {
    let subject = mount(
      <StyleRoot>
        <Plans plans={plans} pinnable />
      </StyleRoot>,
    );

    expect(
      subject
        .find(Plan)
        .at(0)
        .prop("pinnable"),
    ).toBe(true);
  });

  it("should call onPlanPin with the right plan on plan pin click", () => {
    let spy = jest.fn();
    let subject = mount(
      <StyleRoot>
        <Plans plans={plans} pinnable onPlanPin={spy} />
      </StyleRoot>,
    );

    subject
      .find(Plan)
      .at(0)
      .simulate("contextmenu");
    remote.getListReturn()[0].click();
    expect(spy).toBeCalled();
  });

  it("should call onPlanUnpin with the right plan on plan unpin click", () => {
    let spy = jest.fn();
    let subject = mount(
      <StyleRoot>
        <Plans plans={plans} onPlanUnpin={spy} />
      </StyleRoot>,
    );

    subject
      .find(Plan)
      .at(0)
      .simulate("contextmenu");
    remote.getListReturn()[0].click();
    expect(spy).toBeCalled();
  });

  it("should call onPlanRemove with the right plan on plan remove click with pinnable", () => {
    let spy = jest.fn();
    let subject = mount(
      <StyleRoot>
        <Plans plans={plans} pinnable onPlanRemove={spy} />
      </StyleRoot>,
    );

    subject
      .find(Plan)
      .at(0)
      .simulate("contextmenu");
    remote.getListReturn()[1].click();
    expect(spy).toBeCalled();
  });

  it("should call onPlanRemove with the right plan on plan remove click without pinnable", () => {
    let spy = jest.fn();
    let subject = mount(
      <StyleRoot>
        <Plans plans={plans} onPlanRemove={spy} />
      </StyleRoot>,
    );

    subject
      .find(Plan)
      .at(0)
      .simulate("contextmenu");
    remote.getListReturn()[1].click();
    expect(spy).toBeCalled();
  });

  it("should display 'No plan has been created yet' when no plan has been created", () => {
    let subject = mount(
      <StyleRoot>
        <Plans plans={[]} pinnable />
      </StyleRoot>,
    );

    expect(subject.text()).toBe("No plan has been created yet");
  });
});
