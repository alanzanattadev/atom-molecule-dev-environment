"use babel";
// @flow

import {
  getBranchesFromBranchOutput,
  getRemotesFromRemoteOutput,
} from "./parser";

describe("Parser", () => {
  describe("getBranchesFromBranchOutput", () => {
    it("should return branches", () => {
      let output = `
        master
        * dev
        feature
      `;
      let subject = getBranchesFromBranchOutput(output);

      expect(subject.length).toBe(3);
      expect(subject[0].current).toBe(false);
      expect(subject[0].name).toBe("master");
      expect(subject[1].current).toBe(true);
      expect(subject[1].name).toBe("dev");
      expect(subject[2].current).toBe(false);
      expect(subject[2].name).toBe("feature");
    });
  });

  describe("getRemotesFromRemoteOutput", () => {
    it("should return remotes", () => {
      let output = `
        github
        origin
        backup
      `;
      let subject = getRemotesFromRemoteOutput(output);

      expect(subject.length).toBe(3);
      expect(subject[0].name).toBe("github");
      expect(subject[1].name).toBe("origin");
      expect(subject[2].name).toBe("backup");
    });
  });
});
