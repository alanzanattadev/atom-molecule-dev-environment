"use babel";
// @flow

import configureMockStore from "redux-mock-store";
import { createEpicMiddleware } from "redux-observable";
import Rx from "rxjs";
import { isPackageOfPlugin, getPackageOfPlugin } from "../Model/FindPackages";
import { refreshPackages } from "../Actions/RefreshPackages";
import packagesEpic from "./Packages";

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

describe("Packages Epic", () => {
  class File {}
  class Directory {}

  let store;

  function findPackages(fileOrDir, plugin) {
    // Used in LOAD_PACKAGE_ERROR test
    if (plugin.hasSomeError) {
      return Rx.Observable.throw(new Error("Something wrong happened"));
    }
    return Rx.Observable.of(
      Rx.Observable.of(
        getPackageOfPlugin("/someDir/package.json", fakePlugin, true),
      ),
    );
  }

  beforeEach(() => {
    const fakeLstat = (path, callback) => {
      callback(null, { isDirectory: true });
    };
    const epicMiddleware = createEpicMiddleware(
      packagesEpic(findPackages, File, Directory, 2, fakeLstat),
    );
    const mockStore = configureMockStore([epicMiddleware]);
    const initialState = {};
    store = mockStore(initialState);
  });

  it("should dispatch PACKAGES_REFRESHED", () => {
    store.dispatch(refreshPackages("/", [fakePlugin]));
    jest.runAllTimers();

    expect(store.getActions()[1]).toEqual({
      type: "PACKAGES_REFRESHED",
      payload: {
        rootPath: "/",
        packages: [
          getPackageOfPlugin("/someDir/package.json", fakePlugin, true),
        ],
        plugins: [fakePlugin],
      },
    });
  });

  it.skip("should dispatch LOAD_PACKAGE_ERROR", () => {
    const errorPlugin = {
      isPackage: "somethingSomething",
      tool: fakeTool,
      hasSomeError: true,
    };
    store.dispatch(refreshPackages("/", [errorPlugin, fakePlugin]));
    jest.runAllTimers();

    expect(store.getActions()[1]).toEqual({
      type: "LOAD_PACKAGE_ERROR",
      payload: {
        toolName: "toolName",
        errorMessage: "Something wrong happened",
      },
    });
    expect(store.getActions()[2]).toEqual({
      type: "PACKAGES_REFRESHED",
      payload: {
        rootPath: "/",
        packages: [
          getPackageOfPlugin("/someDir/package.json", fakePlugin, true),
        ],
        plugins: [errorPlugin, fakePlugin],
      },
    });
  });
});
