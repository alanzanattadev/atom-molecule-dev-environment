"use babel";
// @flow

import { createFilesWatcherObservable } from "./createFilesWatcherObservable.js";
import { ON_MODIFIED, ON_DELETED, ON_CREATED } from "./fileEventsHelpers.js";
import watchPathSetter from "../Fake/fakeWatchPath.js";

describe("event observable using fake watchman", () => {
  it("should prompt 3 files are modified", () => {
    const test = jest.fn();
    createFilesWatcherObservable(
      watchPathSetter(ON_MODIFIED),
      "/path/to/test/",
      /.*\.js$/gi,
    ).subscribe(next => test(next));
    expect(test).toHaveBeenCalledTimes(3);
  });

  it("should prompt 1 file is deleted", () => {
    const test = jest.fn();
    createFilesWatcherObservable(
      watchPathSetter(ON_DELETED),
      "/path/to/test/",
      /.*\.js$/gi,
    ).subscribe(next => test(next));
    expect(test).toHaveBeenCalledTimes(1);
  });

  it("should prompt 1 file is created", () => {
    const test = jest.fn();
    createFilesWatcherObservable(
      watchPathSetter(ON_CREATED),
      "/path/to/test/",
      /.*\.js$/gi,
    ).subscribe(next => test(next));
    expect(test).toHaveBeenCalledTimes(1);
  });
});
