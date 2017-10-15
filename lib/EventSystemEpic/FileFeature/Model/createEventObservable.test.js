"use babel";
// @flow

import {
  createEventObservable,
  ON_MODIFIED,
  ON_DELETED,
  ON_CREATED,
} from "./createEventObservable.js";
import watchPathSetter from "../Fake/fakeWatchPath.js";

describe("event observable using fake watchman", () => {
  it("should prompt 3 files are modified", () => {
    const test = jest.fn();
    const subject = createEventObservable(
      ON_MODIFIED,
      watchPathSetter(ON_MODIFIED),
      "/path/to/test/",
      /.*\.js$/gi,
    ).subscribe(next => test(next));
    expect(test).toHaveBeenCalledTimes(3);
  });

  it("should prompt 1 file is deleted", () => {
    const test = jest.fn();
    const subject = createEventObservable(
      ON_DELETED,
      watchPathSetter(ON_DELETED),
      "/path/to/test/",
      /.*\.js$/gi,
    ).subscribe(next => test(next));
    expect(test).toHaveBeenCalledTimes(1);
  });

  it("should prompt 1 file is created", () => {
    const test = jest.fn();
    const subject = createEventObservable(
      ON_CREATED,
      watchPathSetter(ON_CREATED),
      "/path/to/test/",
      /.*\.js$/gi,
    ).subscribe(next => test(next));
    expect(test).toHaveBeenCalledTimes(1);
  });
});
