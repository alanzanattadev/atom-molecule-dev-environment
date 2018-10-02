"use babel";
// @flow

import configureMockStore from "redux-mock-store";
import { createEpicMiddleware } from "redux-observable";
import Rx from "rxjs";
import { getPackageOfPlugin } from "../Model/FindPackages";
import { refreshPackages } from "../Actions/RefreshPackages";
import packagesEpic from "./Packages";

jest.useFakeTimers();

const fakeTool = { name: "toolName", id: "1", iconUri: "toolIcon" };
const fakePlugin = {
  isPackage: "package.json",
  tool: fakeTool,
};

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
