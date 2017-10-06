"use babel";
// @flow

import {
  createEventObservable,
  ON_MODIFIED,
  ON_DELETED,
  ON_CREATED,
} from "./createEventObservable.js";
import fakeWatchman from "../Fake/fakeWatchman.js";
import { apiPresets } from "./apiPresets.js";

describe("event observable using fake watchman", () => {
  it("should prompt 3 files are modified", () => {
    const test = jest.fn();
    const subject = createEventObservable(
      ON_MODIFIED,
      fakeWatchman,
      "/path/to/test/",
      apiPresets.js,
    ).subscribe(next => test(next));
    expect(test).toHaveBeenCalledTimes(3);
  });

  it("should prompt 1 file is deleted", () => {
    const test = jest.fn();
    const subject = createEventObservable(
      ON_DELETED,
      fakeWatchman,
      "/path/to/test/",
      apiPresets.js,
    ).subscribe(next => test(next));
    expect(test).toHaveBeenCalledTimes(1);
  });

  it("should prompt 1 file is created", () => {
    const test = jest.fn();
    const subject = createEventObservable(
      ON_CREATED,
      fakeWatchman,
      "/path/to/test/",
      apiPresets.js,
    ).subscribe(next => test(next));
    expect(test).toHaveBeenCalledTimes(1);
  });
});
