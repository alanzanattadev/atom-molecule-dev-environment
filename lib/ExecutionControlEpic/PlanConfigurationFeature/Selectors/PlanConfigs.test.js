"use babel";
// @flow

import { selectPinnedPlans, selectPlansOfTool } from "./PlanConfigs";
import type { PlanConfigsReducer } from "../Reducers/PlanConfigs";
import { Map, List } from "immutable";

describe("PlanConfigs Selector", () => {
  let state: PlanConfigsReducer = Map([
    [
      "dockerid",
      Map([
        [
          "0",
          {
            tool: {
              iconUri: "atom://myplugin/icon.png",
              name: "docker",
              id: "dockerid",
              uri: "file:///file",
            },
            config: {
              service: "web",
            },
            pinned: true,
            stager: { type: "integrated" },
            packageInfos: {
              path: "/package",
              type: "file",
              name: "",
            },
            id: "0",
            name: "web",
          },
        ],
        [
          "1",
          {
            tool: {
              iconUri: "atom://myplugin/icon.png",
              name: "docker",
              id: "dockerid",
              uri: "file:///file",
            },
            config: {
              service: "db",
            },
            pinned: false,
            stager: { type: "integrated" },
            packageInfos: {
              path: "/package",
              type: "file",
              name: "",
            },
            id: "1",
            name: "db",
          },
        ],
      ]),
    ],
  ]);
  describe("selectPlansOfTool", () => {
    it("should return plans of specific tool", () => {
      let subject = selectPlansOfTool(state, "dockerid");

      expect(subject).toEqual(
        List([
          {
            tool: {
              iconUri: "atom://myplugin/icon.png",
              name: "docker",
              id: "dockerid",
              uri: "file:///file",
            },
            config: {
              service: "web",
            },
            pinned: true,
            stager: { type: "integrated" },
            packageInfos: {
              path: "/package",
              type: "file",
              name: "",
            },
            id: "0",
            name: "web",
          },
          {
            tool: {
              iconUri: "atom://myplugin/icon.png",
              name: "docker",
              id: "dockerid",
              uri: "file:///file",
            },
            config: {
              service: "db",
            },
            pinned: false,
            stager: { type: "integrated" },
            packageInfos: {
              path: "/package",
              type: "file",
              name: "",
            },
            id: "1",
            name: "db",
          },
        ]),
      );
    });
  });

  describe("selectPinnedPlans", () => {
    it("should return pinned plans", () => {
      let subject = selectPinnedPlans(state);

      expect(subject).toEqual(
        List([
          {
            tool: {
              iconUri: "atom://myplugin/icon.png",
              name: "docker",
              id: "dockerid",
              uri: "file:///file",
            },
            config: {
              service: "web",
            },
            pinned: true,
            stager: { type: "integrated" },
            packageInfos: {
              path: "/package",
              type: "file",
              name: "",
            },
            id: "0",
            name: "web",
          },
        ]),
      );
    });
  });
});
