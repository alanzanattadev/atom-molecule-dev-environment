"use babel";
// @flow

import { createFilesWatcherObservable } from "./createFilesWatcherObservable.js";
import { apiPresets } from "./apiPresets.js";
import fakeWatchMan from "../Fake/fakeWatchman.js";

describe("event observable using fake watchman", () => {
  it("should prompt 2 files modified, 1 created and 1 deleted ", () => {
    const expectedOutput = [
      {
        action: "modified",
        path: "/path/to/test/test2",
      },
      {
        action: "modified",
        path: "/path/to/test/test",
      },
      {
        action: "created",
        path: "/path/to/test/true_file",
      },
      {
        action: "deleted",
        path: "/path/to/test/test2",
      },
    ];
    let subject = [];
    createFilesWatcherObservable(
      fakeWatchMan,
      "/path/to/test/",
      apiPresets.js,
    ).subscribe(next => subject.push(next));
    expect(subject).toEqual(expectedOutput);
  });
});
