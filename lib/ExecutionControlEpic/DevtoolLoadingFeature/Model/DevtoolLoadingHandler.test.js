"use babel";
// @flow
/* eslint-disable no-unused-vars */

import { provideDevtool } from "./DevtoolLoadingHandler";
import DevToolsController from "./DevToolsController";
import type { ProvidedDevTool } from "../Types/types.js.flow";

describe("DevtoolLoadingHandler", () => {
  describe("provideDevtool", () => {
    it("should dispatch an ADD_DEVTOOL action", () => {
      let spy = jest.fn();
      let store = {
        dispatch: spy,
      };
      let devtool: ProvidedDevTool = {
        infos: {
          id: "dockerid",
          iconUri: "atom://",
          name: "docker",
        },
        configSchema: {
          type: "string",
          default: "",
        },
        getStrategyForPlan(plan) {
          return {
            strategy: { type: "shell", command: "ls", cwd: "/" },
            controller: {
              onStdoutData() {},
              onStderrData() {},
              onError() {},
              onExit() {},
            },
          };
        },
        isPackage: "package.json",
      };
      provideDevtool(store, new DevToolsController())(devtool);

      expect(spy).toBeCalled();
      expect(
        spy.mock.calls.find(call => call[0].type == "ADD_DEVTOOL"),
      ).toBeDefined();
    });

    it("should dispatch an ADD_PLAN_CONFIGURATION_SCHEMA action", () => {
      let spy = jest.fn();
      let store = {
        dispatch: spy,
      };
      let devtool: ProvidedDevTool = {
        infos: {
          id: "dockerid",
          iconUri: "atom://",
          name: "docker",
        },
        configSchema: {
          type: "string",
          default: "",
        },
        getStrategyForPlan(plan) {
          return {
            strategy: { type: "shell", command: "ls", cwd: "/" },
            controller: {
              onStdoutData() {},
              onStderrData() {},
              onError() {},
              onExit() {},
            },
          };
        },
        isPackage: "package.json",
      };
      provideDevtool(store, new DevToolsController())(devtool);

      expect(spy).toBeCalled();
      expect(
        spy.mock.calls.find(
          call => call[0].type == "ADD_PLAN_CONFIGURATION_SCHEMA",
        ),
      ).toBeDefined();
    });
  });
});
