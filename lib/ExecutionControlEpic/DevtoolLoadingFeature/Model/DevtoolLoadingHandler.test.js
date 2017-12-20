"use babel";
// @flow
/* eslint-disable no-unused-vars */

import { provideDevtool } from "./DevtoolLoadingHandler";
import DevToolsController from "./DevToolsController";
import type { ProvidedDevTool } from "../Types/types.js.flow";

describe("DevtoolLoadingHandler", () => {
  describe("provideDevtool", () => {
    let testDevTool = "Fake/index.js";

    it("should dispatch an ADD_DEVTOOL action", () => {
      let spy = jest.fn();
      let store = {
        dispatch: spy,
      };
      provideDevtool(store, new DevToolsController())(testDevTool);

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
      provideDevtool(store, new DevToolsController())(testDevTool);

      expect(spy).toBeCalled();
      expect(
        spy.mock.calls.find(
          call => call[0].type == "ADD_PLAN_CONFIGURATION_SCHEMA",
        ),
      ).toBeDefined();
    });
  });
});
