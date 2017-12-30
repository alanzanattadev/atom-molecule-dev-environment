"use babel";
// @flow

import DevToolsInfo from "./DevToolsInfo";
import { addDevTool } from "../Actions/AddDevTool";

describe("DevToolsInfo", () => {
  describe("ADD_DEVTOOL", () => {
    it("should add a tool", () => {
      let action = addDevTool({
        id: "toolid",
        name: "shell",
        iconUri: "atom://myplugin/image.png",
        uri: "file:///file",
      });
      let state = [];
      let subject = DevToolsInfo(state, action);

      expect(subject).toEqual([
        {
          id: "toolid",
          name: "shell",
          iconUri: "atom://myplugin/image.png",
          uri: "file:///file",
        },
      ]);
    });
  });
});
