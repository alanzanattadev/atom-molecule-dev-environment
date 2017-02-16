"use babel";
// @flow

import { selectPlansOfTool, selectPinnedPlans } from "./PlanConfigs";
import type { PlanConfigsReducer } from "../Reducers/PlanConfigs";

describe("PlanConfigs Selector", () => {
  let state: PlanConfigsReducer = [
    {
      tool: {
        iconUri: "atom://myplugin/icon.png",
        name: "docker",
        id: "dockerid"
      },
      config: {
        service: "web"
      },
      pinned: true,
      stager: { type: "integrated" },
      name: "web"
    },
    {
      tool: {
        iconUri: "atom://myplugin/icon.png",
        name: "docker",
        id: "dockerid"
      },
      config: {
        service: "db"
      },
      pinned: false,
      stager: { type: "integrated" },
      name: "db"
    },
    {
      tool: {
        iconUri: "atom://myplugin/icon.png",
        name: "gulp",
        id: "gulp1"
      },
      config: {
        task: "watch"
      },
      pinned: true,
      stager: { type: "integrated" },
      name: "plan1"
    },
    {
      tool: {
        iconUri: "atom://myplugin/icon.png",
        name: "nightwatch",
        id: "nightwatch1"
      },
      config: {
        env: "dev"
      },
      pinned: true,
      stager: { type: "integrated" },
      name: "plan1"
    }
  ];
  describe("selectPlansOfTool", () => {
    it("should return plans of specific tool", () => {
      let subject = selectPlansOfTool(state, "dockerid");

      expect(subject).toEqual([state[0], state[1]]);
    });
  });

  describe("selectPinnedPlans", () => {
    it("should return pinned plans", () => {
      let subject = selectPinnedPlans(state);

      expect(subject).toEqual([state[0], state[2], state[3]]);
    });
  });
});
