"use babel";

import configureMockStore from "redux-mock-store";
import { createEpicMiddleware } from "redux-observable";
import { findPackages } from "../Fake/fakeFindPackages";
import { packagesRefreshed } from "../Actions/PackagesRefreshed";
import generatePlansEpic from "./GeneratePlans";
import packagesEpic from "./Packages";

const epicGeneratePlans = createEpicMiddleware(generatePlansEpic);
const mockStore = configureMockStore([epicGeneratePlans]);

jest.useFakeTimers();

describe("GeneratePlans Epic", () => {
  let store;

  beforeEach(() => {
    const initialState = {};
    store = mockStore(initialState);
  });

  it("should dispatch a addPlanConfig", () => {
    const fakeConfig = {
      name: "test1",
      caseValue: { script: "script1", environmentVariables: [] },
      expressionValue: "run",
    };
    const fakePlugin = {
      tool: { name: "toolName", id: "1", iconUri: "toolIcon" },
      isPackage: "package.json",
      generatePlansForPackage(packageName) {
        return [ fakeConfig ];
      },
    }
    const fakePackage = {
      name: "package.json",
      path: "/firstDir/package.json",
      type: "file",
      plugin: fakePlugin,
    };

    const expectedPayload = {
      id: "0",
      name: "test1",
      tool: fakePlugin.tool,
      config: fakeConfig,
      stager: { type: "integrated" },
      packageInfo : fakePackage,
    };

    store.dispatch(packagesRefreshed("/", [ fakePackage ], [ fakePlugin ]));
    jest.runAllTimers();

    expect(store.getActions()[1]).toEqual({
      type: "ADD_PLAN_CONFIGURATION",
      payload: expectedPayload,
    });

  });
});
