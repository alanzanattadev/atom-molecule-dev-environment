"use babel";
// @flow

import { fileEventsHelpers } from "./fileEventsHelpers.js";
import { fakeEvents } from "../Fake/fakeEvents.js";

describe("File Events Helpers", () => {
  it("should have files modified", () => {
    const subject = fileEventsHelpers.hasFilesModified(fakeEvents);
    expect(subject).toBe(true);
  });

  it("should have files created", () => {
    const subject = fileEventsHelpers.hasFilesCreated(fakeEvents);
    expect(subject).toBe(true);
  });

  it("should not have files deleted", () => {
    const subject = fileEventsHelpers.hasFilesDeleted(fakeEvents);
    expect(subject).toBe(false);
  });

  it("should get 3 files modified", () => {
    const subject = fileEventsHelpers.getFilesModified(fakeEvents);
    expect(subject).toHaveLength(3);
  });

  it("should get 1 file created", () => {
    const subject = fileEventsHelpers.getFilesCreated(fakeEvents);
    expect(subject).toHaveLength(1);
  });

  it("should not get any file deleted", () => {
    const subject = fileEventsHelpers.getFilesDeleted(fakeEvents);
    expect(subject).toHaveLength(0);
  });
});
