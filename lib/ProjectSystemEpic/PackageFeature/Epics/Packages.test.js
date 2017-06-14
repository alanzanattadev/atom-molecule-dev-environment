"use babel";
// @flow

import configureMockStore from "redux-mock-store";
import { createEpicMiddleware } from "redux-observable";
import { findPackages } from "../Fake/fakeFindPackages";
import { refreshPackages } from "../Actions/RefreshPackages";
import packagesEpic from "./Packages";

const epicMiddleware = createEpicMiddleware(packagesEpic(findPackages));
const mockStore = configureMockStore([epicMiddleware]);

jest.useFakeTimers();

describe("Packages Epic", () => {
  let store;

  beforeEach(() => {
    const initialState = {};
    store = mockStore(initialState);
  });

  it("should dispatch a packages refreshed", () => {
    const payload = {
      rootPath: "/",
      plugins: [
        {
          tool: { name: "toolName", id: "1", iconUri: "toolIcon" },
          isPackage: "package.json",
        },
      ],
    };

    const expectedPayload = {
      rootPath: "/",
      packages: [
        {
          name: "package.json",
          path: "/firstDir/package.json",
          type: "file",
          plugin: {
            tool: { name: "toolName", id: "1", iconUri: "toolIcon" },
          },
        },
      ],
      plugins: [
        {
          isPackage: "package.json",
          tool: {
            iconUri: "toolIcon",
            id: "1",
            name: "toolName",
          },
        },
      ],
    };

    store.dispatch(refreshPackages(payload.rootPath, payload.plugins));
    jest.runAllTimers();

    expect(store.getActions()[1]).toEqual({
      type: "PACKAGES_REFRESHED",
      payload: expectedPayload,
    });
  });
});

export type Plugin = {
  tool: DevTool,
  isPackage?: PackageTester,
};

export type Directory = {
  name: string,
  files: Array<string | Directory>,
};

export type PackageInfos = {
  name: string,
  path: string,
  type: "file" | "directory",
};

export type Package = PackageInfos & {
  plugin: Plugin,
};
