"use babel";
// @flow

import {getAssociatedFiles, getBasename, getExtension} from "./AssociatedFiles";

describe("AssociatedFiles", () => {
  describe("getBasename", () => {
    it("should return basename with simple extension", () => {
      let subject = getBasename("/home/alan/ok.txt");

      expect(subject).toBe("ok");
    });

    it("should return basename with double extension", () => {
      let subject = getBasename("/home/alan/myfile.native.js");

      expect(subject).toBe("myfile");
    });
  });

  describe("getExtension", () => {
    it("should return extension when extension is simple", () => {
      let subject = getExtension("/home/alan/myfile.txt");

      expect(subject).toBe(".txt");
    });

    it("should return extension when extension is double", () => {
      let subject = getExtension("/home/alan/myfile.native.js");

      expect(subject).toBe(".native.js");
    });
  });

  describe("getAssociatedFiles", () => {
    it("should return test and story associated with .js", () => {
      let subject = getAssociatedFiles("/home/alan/myfile.js");

      expect(subject).toEqual([
        "/home/alan/myfile.test.js",
        "/home/alan/myfile.story.js",
      ]);
    });

    it("should return test and .js associated with story", () => {
      let subject = getAssociatedFiles("/home/alan/myfile.story.js");

      expect(subject).toEqual([
        "/home/alan/myfile.test.js",
        "/home/alan/myfile.js",
      ]);
    });
  });
});
