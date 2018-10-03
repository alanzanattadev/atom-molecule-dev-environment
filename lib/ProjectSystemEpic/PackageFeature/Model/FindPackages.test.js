"use babel";
// @flow

import { isPackageOfPlugin, getPackageOfPlugin } from "./FindPackages";

jest.useFakeTimers();

describe("isPackageOfPlugin", () => {
  const filenames = [
    "someDir/.eslintrc.js",
    "someDir/package.json",
    "someDir/someFile.txt",
  ];
  const fakeDir = { files: filenames };

  it("should filter packages that match its string", async () => {
    const fakePlugin = { isPackage: ".eslintrc.js" };

    expect(await isPackageOfPlugin(filenames[0], fakePlugin, fakeDir)).toBe(
      true,
    );
    expect(await isPackageOfPlugin(filenames[1], fakePlugin, fakeDir)).toBe(
      false,
    );
    expect(await isPackageOfPlugin(filenames[2], fakePlugin, fakeDir)).toBe(
      false,
    );
  });

  it("should filter packages that match its regexp", async () => {
    const fakePlugin = { isPackage: /.*\.json/ };

    expect(await isPackageOfPlugin(filenames[0], fakePlugin, fakeDir)).toBe(
      false,
    );
    expect(await isPackageOfPlugin(filenames[1], fakePlugin, fakeDir)).toBe(
      true,
    );
    expect(await isPackageOfPlugin(filenames[2], fakePlugin, fakeDir)).toBe(
      false,
    );
  });

  it("should filter packages that match its method", async () => {
    const fakePlugin = {
      isPackage: async packagePath => packagePath.endsWith("package.json"),
    };

    expect(await isPackageOfPlugin(filenames[0], fakePlugin, fakeDir)).toBe(
      false,
    );
    expect(await isPackageOfPlugin(filenames[1], fakePlugin, fakeDir)).toBe(
      true,
    );
    expect(await isPackageOfPlugin(filenames[2], fakePlugin, fakeDir)).toBe(
      false,
    );
  });

  it("should throw when isPackage is of the wrong type", async () => {
    const fakePlugin = {
      isPackage: true,
    };

    expect(
      isPackageOfPlugin(filenames[0], fakePlugin, fakeDir),
    ).rejects.toThrow();
  });
});

const fakeTool = { name: "toolName", id: "1", iconUri: "toolIcon" };
const fakePlugin = {
  isPackage: "package.json",
  tool: fakeTool,
};

describe("getPackageOfPlugin", () => {
  it("should return a package object", () => {
    expect(
      getPackageOfPlugin("/someDir/package.json", fakePlugin, true),
    ).toEqual({
      name: "someDir",
      path: "/someDir/package.json",
      type: "file",
      plugin: fakePlugin,
    });

    expect(getPackageOfPlugin("/someDir/", fakePlugin, false)).toEqual({
      name: "",
      path: "/someDir/",
      type: "directory",
      plugin: fakePlugin,
    });
  });
});
