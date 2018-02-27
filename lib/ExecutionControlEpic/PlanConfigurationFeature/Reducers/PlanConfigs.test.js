"use babel";
// @flow

import PlanConfigs from "./PlanConfigs";
import type { AddPlanConfigAction } from "../Actions/AddPlanConfig";
import { addPlanConfig } from "../Actions/AddPlanConfig";
import type { PinPlanConfigAction } from "../Actions/PinPlanConfig";
import { pinPlanConfig } from "../Actions/PinPlanConfig";
import type { UnpinPlanConfigAction } from "../Actions/UnpinPlanConfig";
import { unpinPlanConfig } from "../Actions/UnpinPlanConfig";
import type { RemovePlanConfigAction } from "../Actions/RemovePlanConfig";
import { removePlanConfig } from "../Actions/RemovePlanConfig";
import type { PlanConfig } from "../Types/types.js.flow";
import { Map } from "immutable";

describe("PlanConfigs", () => {
  describe("ADD_PLAN_CONFIGURATION", () => {
    it("should add a plan configuration", () => {
      let state = Map();
      let action: AddPlanConfigAction = addPlanConfig(
        "0",
        "ls",
        {
          id: "toolid",
          name: "shell",
          iconUri: "atom://myplugin/icon.png",
          uri: "file:///file",
        },
        "ls -l",
        { type: "integrated" },
        {
          name: "",
          path: "/",
          type: "directory",
          uriPlatform: "posix",
        },
      );
      let subject = PlanConfigs(state, action);

      expect(subject).toMatchSnapshot();
    });
  });

  describe("PIN_PLAN_CONFIGURATION", () => {
    it("should pin plan config", () => {
      let planConfig: PlanConfig = {
        name: "ls",
        id: "0",
        tool: {
          id: "toolid",
          name: "shell",
          iconUri: "atom://myplugin/icon.png",
          uri: "file:///file",
        },
        config: "ls -l",
        stager: { type: "integrated" },
        packageInfo: {
          name: "",
          path: "/",
          type: "directory",
          uriPlatform: "posix",
        },
        pinned: false,
      };
      let planConfig2: PlanConfig = {
        name: "mimikatz",
        id: "1",
        tool: {
          id: "toolid",
          name: "powershell",
          iconUri: "atom://myplugin/icon.png",
          uri: "file:///file",
        },
        config: "Invoke-Mimikatz",
        stager: { type: "integrated" },
        packageInfo: {
          name: "",
          path: "/",
          type: "directory",
          uriPlatform: "posix",
        },
        pinned: false,
      };
      let state = Map([
        ["toolid", Map([["0", planConfig], ["1", planConfig2]])],
      ]);
      let action: PinPlanConfigAction = pinPlanConfig(
        Object.assign({}, planConfig, { state: null }),
      );
      let subject = PlanConfigs(state, action);

      expect(subject).toMatchSnapshot();
    });
  });

  describe("UNPIN_PLAN_CONFIGURATION", () => {
    it("should unpin plan config", () => {
      let planConfig: PlanConfig = {
        name: "ls",
        id: "0",
        tool: {
          id: "toolid",
          name: "shell",
          iconUri: "atom://myplugin/icon.png",
          uri: "file:///file",
        },
        config: "ls -l",
        stager: { type: "integrated" },
        packageInfo: {
          name: "",
          path: "/",
          type: "directory",
          uriPlatform: "posix",
        },
        pinned: true,
      };
      let planConfig2: PlanConfig = {
        name: "mimikatz",
        id: "1",
        tool: {
          id: "toolid",
          name: "powershell",
          iconUri: "atom://myplugin/icon.png",
          uri: "file:///file",
        },
        config: "Invoke-Mimikatz",
        stager: { type: "integrated" },
        packageInfo: {
          name: "",
          path: "/",
          type: "directory",
          uriPlatform: "posix",
        },
        pinned: false,
      };
      let state = Map([
        ["toolid", Map([["0", planConfig], ["1", planConfig2]])],
      ]);
      let action: UnpinPlanConfigAction = unpinPlanConfig(
        Object.assign({}, planConfig, { state: null }),
      );
      let subject = PlanConfigs(state, action);

      expect(subject).toMatchSnapshot();
    });
  });

  describe("REMOVE_PLAN_CONFIGURATION", () => {
    it("should remove plan config", () => {
      let planConfig: PlanConfig = {
        name: "ls",
        id: "0",
        tool: {
          id: "toolid",
          name: "shell",
          iconUri: "atom://myplugin/icon.png",
          uri: "file:///file",
        },
        config: "ls -l",
        stager: { type: "integrated" },
        packageInfo: {
          name: "",
          path: "/",
          type: "directory",
          uriPlatform: "posix",
        },
        pinned: false,
      };
      let planConfig2: PlanConfig = {
        name: "mimikatz",
        id: "1",
        tool: {
          id: "toolid",
          name: "powershell",
          iconUri: "atom://myplugin/icon.png",
          uri: "file:///file",
        },
        config: "Invoke-Mimikatz",
        stager: { type: "integrated" },
        packageInfo: {
          name: "",
          path: "/",
          type: "directory",
          uriPlatform: "posix",
        },
        pinned: false,
      };
      let state = Map([
        ["toolid", Map([["0", planConfig], ["1", planConfig2]])],
      ]);
      let action: RemovePlanConfigAction = removePlanConfig(
        Object.assign({}, planConfig, { state: null }),
      );
      let subject = PlanConfigs(state, action);

      expect(subject).toMatchSnapshot();
    });
  });
});
