import React from "react";
import { mount } from "enzyme";
import Plan from "./Plan";
import { StyleRoot } from "radium";
import fakeRemote from "../Fake/fakeRemote";

beforeEach(() => {
  fakeRemote.resetMenu();
});

describe("Plan", () => {
  it("should display the plan name", () => {
    let subject = mount(<StyleRoot><Plan name="build" /></StyleRoot>);

    expect(
      subject.findWhere(comp => comp.type() == "span" && comp.text() == "build")
        .length,
    ).toBe(1);
  });

  it("should display a context menu with Pin and Remove when pinnable is passed", () => {
    let subject = mount(<StyleRoot><Plan pinnable /></StyleRoot>);

    subject.find(Plan).simulate("contextmenu");
    expect(fakeRemote.getListReturn()).toMatchSnapshot();
  });

  it("should display a context menu with Unpin and Remove when pinnable is not passed", () => {
    let subject = mount(<StyleRoot><Plan /></StyleRoot>);

    subject.find(Plan).simulate("contextmenu");
    expect(fakeRemote.getListReturn()).toMatchSnapshot();
  });

  it("should display the tool icon", () => {
    let subject = mount(
      <StyleRoot><Plan iconUri="atom://myplugin/icon.png" /></StyleRoot>,
    );

    expect(subject.find("img").at(0).prop("src")).toBe(
      "atom://myplugin/icon.png",
    );
  });

  it("should call onPin when Pin in context menu is clicked with pinnable", () => {
    let spy = jest.fn();
    let subject = mount(<StyleRoot><Plan pinnable onPin={spy} /></StyleRoot>);

    subject.find(Plan).simulate("contextmenu");
    fakeRemote.getListReturn()[0].click();
    expect(spy).toBeCalled();
  });

  it("should call onRemove when Remove in context menu is clickedwith pinnable", () => {
    let spy = jest.fn();
    let subject = mount(
      <StyleRoot><Plan pinnable onRemove={spy} /></StyleRoot>,
    );

    subject.find(Plan).simulate("contextmenu");
    fakeRemote.getListReturn()[1].click();
    expect(spy).toBeCalled();
  });

  it("should call onUnpin when Un-pin in context menu is clicked without pinnable", () => {
    let spy = jest.fn();
    let subject = mount(<StyleRoot><Plan onUnpin={spy} /></StyleRoot>);

    subject.find(Plan).simulate("contextmenu");
    fakeRemote.getListReturn()[0].click();
    expect(spy).toBeCalled();
  });

  it("should call onRemove when Remove in context menu is clicked without pinnable", () => {
    let spy = jest.fn();
    let subject = mount(<StyleRoot><Plan onRemove={spy} /></StyleRoot>);

    subject.find(Plan).simulate("contextmenu");
    fakeRemote.getListReturn()[1].click();
    expect(spy).toBeCalled();
  });

  it("should call onClick when plan is clicked", () => {
    let spy = jest.fn();
    let subject = mount(<StyleRoot><Plan onClick={spy} /></StyleRoot>);

    subject.find(Plan).simulate("click");
    expect(spy).toBeCalled();
  });
});
