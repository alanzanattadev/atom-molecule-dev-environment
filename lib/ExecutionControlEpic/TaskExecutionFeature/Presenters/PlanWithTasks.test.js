"use babel";
// @flow

import React from "react";
import {mount} from "enzyme";
import PlanWithTasks from "./PlanWithTasks";
import {StyleRoot} from "radium";
import Task from "./Task";
import Plan from "../../PlanConfigurationFeature/Presenters/Plan";
import type {PlanConfig} from "../../PlanConfigurationFeature/Types/types.js.flow";
import type {Task as TaskType, TaskState} from "../Types/types.js.flow";

describe("PlanWithTasks", () => {
  let plan: PlanConfig & { state: TaskState } = {
    name: "build",
    stager: {
      type: "integrated",
    },
    config: {},
    state: "crashed",
    tool: {
      id: "1",
      name: "gulp",
      iconUri: "atom://molecule/gulp.png",
    },
    packageInfos: {
      name: "",
      path: "/ok",
      type: "directory",
    },
  };
  let tasks: Array<TaskType> = [
    {
      id: "1",
      plan: plan,
      step: 1,
      strategy: {
        type: "shell",
        command: "gulp build",
        cwd: "/ok",
      },
      state: "crashed",
      debut: 1480425542,
      end: 1480425544,
    },
    {
      id: "2",
      plan: plan,
      step: 1,
      strategy: {
        type: "shell",
        command: "gulp build",
        cwd: "/ok",
      },
      state: "running",
      debut: 1480425542,
    },
    {
      id: "3",
      plan: plan,
      step: 1,
      strategy: {
        type: "shell",
        command: "gulp build",
        cwd: "/ok",
      },
      state: "stopped",
      debut: 1480425542,
      end: 1480425544,
    },
    {
      id: "4",
      plan: plan,
      step: 1,
      strategy: {
        type: "shell",
        command: "gulp build",
        cwd: "/ok",
      },
      state: "crashed",
      debut: 1480425542,
      end: 1480425544,
    },
    {
      id: "5",
      plan: plan,
      step: 1,
      strategy: {
        type: "shell",
        command: "gulp build",
        cwd: "/ok",
      },
      state: "crashed",
      debut: 1480425542,
      end: 1480425544,
    },
    {
      id: "6",
      plan: plan,
      step: 1,
      strategy: {
        type: "shell",
        command: "gulp build",
        cwd: "/ok",
      },
      state: "running",
      debut: 1480425542,
    },
  ];

  it("it should display a plan", () => {
    let subject = mount(
      <StyleRoot>
        <PlanWithTasks plan={plan} tasks={tasks} />
      </StyleRoot>,
    );

    expect(subject.find(Plan).length).toBe(1);
    expect(subject.find(Plan).at(0).prop("state")).toBe(plan.state);
    expect(subject.find(Plan).at(0).prop("iconUri")).toBe(plan.tool.iconUri);
    expect(subject.find(Plan).at(0).prop("name")).toBe(plan.name);
    expect(subject.find(Plan).at(0).prop("onClick")).toBeDefined();
  });

  it("should display tasks on hover", () => {
    let subject = mount(
      <StyleRoot>
        <PlanWithTasks plan={plan} tasks={tasks} />
      </StyleRoot>,
    );

    subject.simulate("mouseenter");

    expect(subject.find(Task).length).toBe(5);
    // subject.simulate('mouseleave');
    //
    // expect(subject.find(Task).length).toBe(0)
  });

  it("should call onTaskClick on Task click", () => {
    let spy = jest.fn();
    let subject = mount(
      <StyleRoot>
        <PlanWithTasks plan={plan} tasks={tasks} onTaskClick={spy} />
      </StyleRoot>,
    );

    subject.simulate("mouseenter");
    subject.find(Task).at(0).simulate("click", {});

    expect(spy).toBeCalledWith(tasks[0]);
  });

  it("should call onPlanClick on Plan click", () => {
    let spy = jest.fn();
    let subject = mount(
      <StyleRoot>
        <PlanWithTasks plan={plan} tasks={tasks} onPlanClick={spy} />
      </StyleRoot>,
    );

    subject.find(Plan).at(0).prop("onClick")();

    expect(spy).toBeCalledWith(plan);
  });
});
