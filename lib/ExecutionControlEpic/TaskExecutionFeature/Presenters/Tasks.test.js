import "raf/polyfill";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount, shallow } from "enzyme";
import Tasks from "./Tasks";
import Task from "./Task";
import moment from "moment";

Enzyme.configure({ adapter: new Adapter() });

describe("Tasks", () => {
  let tasks = [
    {
      id: "1",
      state: "stopped",
      debut: moment().unix(),
      end: moment()
        .subtract(1, "s")
        .unix(),
    },
    {
      id: "2",
      state: "running",
      debut: moment()
        .subtract(2, "m")
        .unix(),
    },
    {
      id: "3",
      state: "running",
      debut: moment()
        .subtract(2, "m")
        .unix(),
      selected: true,
    },
    {
      id: "4",
      state: "failed",
      debut: moment()
        .subtract(2, "m")
        .unix(),
      end: moment()
        .subtract(1, "m")
        .unix(),
    },
    {
      id: "5",
      state: "crashed",
      debut: moment()
        .subtract(3, "m")
        .unix(),
      end: moment().unix(),
    },
    {
      id: "6",
      state: "running",
      debut: moment()
        .subtract(3, "h")
        .unix(),
    },
  ];

  it("should display tasks", () => {
    let subject = shallow(<Tasks tasks={tasks} />);

    expect(subject.find(Task).length).toBe(6);
    let firstTask = subject.find(Task).at(0);
    expect(firstTask.prop("state")).toBe(tasks[0].state);
    expect(firstTask.prop("debut")).toBe(tasks[0].debut);
    expect(firstTask.prop("end")).toBe(tasks[0].end);
  });

  it("should display only 5 tasks when limited props is passed", () => {
    let subject = shallow(<Tasks tasks={tasks} limited />);

    expect(subject.find(Task).length).toBe(5);
  });

  it("should call onTaskClick on click", () => {
    let spy = jest.fn();
    let subject = mount(<Tasks tasks={tasks} onTaskClick={spy} />);

    subject
      .find(Task)
      .at(1)
      .prop("onClick")();

    expect(spy).toBeCalledWith(tasks[1]);
  });
});
