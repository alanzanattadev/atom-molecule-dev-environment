"use babel";
// @flow

import PlanConfigs from "./PlanConfigs";
import type { AddPlanConfigAction } from "../Actions/AddPlanConfig";
import { addPlanConfig } from "../Actions/AddPlanConfig";
import type { PinPlanConfigAction } from "../Actions/PinPlanConfig";
import { pinPlanConfig } from "../Actions/PinPlanConfig";
import type { UnpinPlanConfigAction } from "../Actions/UnpinPlanConfig";
import { unpinPlanConfig } from "../Actions/UnpinPlanConfig";
import type { PlanConfig } from "../Types/types.js.flow";

describe("PlanConfigs", () => {
  describe("ADD_TARGET_CONFIGURATION", () => {
    it("should add a plan configuration", () => {
      let state = [];
      let action: AddPlanConfigAction = addPlanConfig(
        "ls",
        {
          id: "toolid",
          name: "shell",
          iconUri: "atom://myplugin/icon.png"
        },
        "ls -l",
        { type: "integrated" }
      );
      let subject = PlanConfigs(state, action);

      expect(subject).toMatchSnapshot();
    });
  });

  describe("PIN_TARGET_CONFIGURATION", () => {
    it("should pin plan config", () => {
      let planConfig: PlanConfig = {
        name: "ls",
        tool: {
          id: "toolid",
          name: "shell",
          iconUri: "atom://myplugin/icon.png"
        },
        config: "ls -l",
        stager: { type: "integrated" },
        packageInfos: {
          name: '',
          path: '/',
          type: 'directory',
        },
        pinned: false
      };
      let planConfig2: PlanConfig = {
        name: "mimikatz",
        tool: {
          id: "toolid",
          name: "powershell",
          iconUri: "atom://myplugin/icon.png"
        },
        config: "Invoke-Mimikatz",
        stager: { type: "integrated" },
        packageInfos: {
          name: '',
          path: '/',
          type: 'directory',
        },
        pinned: false
      };
      let state = [planConfig, planConfig2];
      let action: PinPlanConfigAction = pinPlanConfig(
        Object.assign({}, planConfig, { state: null })
      );
      let subject = PlanConfigs(state, action);

      expect(subject).toMatchSnapshot();
    });
  });

  describe("UNPIN_TARGET_CONFIGURATION", () => {
    it("should unpin plan config", () => {
      let planConfig: PlanConfig = {
        name: "ls",
        tool: {
          id: "toolid",
          name: "shell",
          iconUri: "atom://myplugin/icon.png"
        },
        config: "ls -l",
        stager: { type: "integrated" },
        packageInfos: {
          name: '',
          path: '/',
          type: 'directory',
        },
        pinned: true
      };
      let planConfig2: PlanConfig = {
        name: "mimikatz",
        tool: {
          id: "toolid",
          name: "powershell",
          iconUri: "atom://myplugin/icon.png"
        },
        config: "Invoke-Mimikatz",
        stager: { type: "integrated" },
        packageInfos: {
          name: '',
          path: '/',
          type: 'directory',
        },
        pinned: false
      };
      let state = [planConfig, planConfig2];
      let action: UnpinPlanConfigAction = unpinPlanConfig(
        Object.assign({}, planConfig, { state: null })
      );
      let subject = PlanConfigs(state, action);

      expect(subject).toMatchSnapshot();
    });
  });
});
