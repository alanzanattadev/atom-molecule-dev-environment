"use babel";
// @flow

import { Map, List } from "immutable";
import configureMockStore from "redux-mock-store";
import { createEpicMiddleware } from "redux-observable";
import watchPackagesEpic from "./WatchPackages";
import { packagesRefreshed } from "../Actions/PackagesRefreshed";
import fakeWatchman from "../../../EventSystemEpic/FileFeature/Fake/fakeWatchman";
import { removePackages } from "../Actions/RemovePackages";

const epicMiddleware = createEpicMiddleware(watchPackagesEpic(fakeWatchman));
const mockStore = configureMockStore([epicMiddleware]);

jest.useFakeTimers();

describe("WatchPackagesEpic", () => {
  let store;

  beforeEach(() => {
    const initialState = {
      plans: Map(),
      packages: Map([
        [
          "1",
          List([
            {
              name: "test2",
              path: "/path/to/test/test2",
              uriPlatform: "unix",
              type: "file",
              plugin: {
                tool: {
                  id: "1",
                  name: "name",
                  iconUri: "iconUri",
                  uri: "uri",
                },
              },
            },
          ]),
        ],
      ]),
    };
    store = mockStore(initialState);
  });

  it("should dispatch smth", () => {
    const payload = {
      rootPath: "/path/to/test",
      packages: [
        {
          name: "test2",
          path: "/path/to/test/test2",
          uriPlatform: "unix",
          type: "file",
          plugin: {
            tool: {
              id: "1",
              name: "name",
              iconUri: "iconUri",
              uri: "uri",
            },
          },
        },
      ],
      plugins: [],
    };
    store.dispatch(
      packagesRefreshed(payload.rootPath, payload.packages, payload.plugins),
    );
    jest.runAllTimers();
    expect(store.getActions()).toEqual([
      packagesRefreshed(payload.rootPath, payload.packages, payload.plugins),
      removePackages("/path/to/test/test2"),
    ]);
  });
});
