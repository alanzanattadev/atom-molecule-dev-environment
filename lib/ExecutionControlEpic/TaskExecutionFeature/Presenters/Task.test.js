import React from "react";
import { mount } from "enzyme";
import moment from "moment";
import Task from "./Task";

describe("Task", () => {
  it("it should display start date", () => {
    let subject = mount(
      <Task state="running" debut={moment().subtract(5, "minutes").unix()} />,
    );

    expect(
      subject.findWhere(
        comp => comp.type() == "span" && comp.text() == "5 minutes ago",
      ).length,
    ).toBe(1);
  });

  it("it should display a colored circle to indicate task state", () => {
    let subject = mount(
      <Task
        state="stopped"
        debut={moment().subtract(5, "minutes").unix()}
        end={moment().subtract(1, "s").unix()}
      />,
    );

    expect(
      subject.findWhere(
        comp => comp.prop("style") && comp.prop("style").borderRadius == "50%",
      ).length,
    ).toBe(1);
  });

  it("it should display stop data when task is stopped", () => {
    let subject = mount(
      <Task
        state="stopped"
        debut={moment().subtract(5, "minutes").unix()}
        end={moment().subtract(1, "s").unix()}
      />,
    );

    expect(
      subject.findWhere(
        comp => comp.type() == "span" && comp.text() == "a few seconds ago",
      ).length,
    ).toBe(1);
  });

  it("it should call onClick on click", () => {
    let spy = jest.fn();
    let subject = mount(<Task onClick={spy} />);

    subject.find("div").at(0).simulate("click", {});

    expect(spy).toBeCalled();
  });
});
