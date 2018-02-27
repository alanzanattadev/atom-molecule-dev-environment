"use babel";
// @flow

import DevToolsInfo from "./DevToolsInfo";
import { addDevTool } from "../Actions/AddDevTool";
import { Map } from "immutable";

describe("DevToolsInfo", () => {
  describe("ADD_DEVTOOL", () => {
    it("should add a tool", () => {
      let action = addDevTool({
        id: "toolid",
        name: "shell",
        iconUri: "atom://myplugin/image.png",
        uri: "file:///file",
      });
      let state = Map();
      let subject = DevToolsInfo(state, action);

      expect(subject).toEqual(
        Map([
          [
            "toolid",
            {
              id: "toolid",
              name: "shell",
              iconUri: "atom://myplugin/image.png",
              uri: "file:///file",
            },
          ],
        ]),
      );
    });
  });
});
