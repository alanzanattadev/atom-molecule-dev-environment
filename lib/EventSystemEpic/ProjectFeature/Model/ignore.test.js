"use babel";
// @flow

import { shouldIgnorePath } from "./ignore";

const testCases = [
  [null, true],
  ["node_modules/testModule", true],
  [".git/file", true],
  ["file.tmp", true],
  ["tmp/file", true],
  ["path", false],
];

describe("Ignore paths", () => {
  testCases.forEach(([path, expected]) =>
    it(`should ${expected ? "not " : ""}ignore path`, () =>
      expect(shouldIgnorePath(path)).toBe(expected)),
  );
});
