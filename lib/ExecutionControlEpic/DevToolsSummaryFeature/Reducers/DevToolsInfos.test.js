import DevToolsInfos from "./DevToolsInfos";
import { addDevTool } from "../Actions/AddDevTool";

describe("DevToolsInfos", () => {
  describe("ADD_DEVTOOL", () => {
    it("should add a tool", () => {
      let action = addDevTool({
        id: "toolid",
        name: "shell",
        iconUri: "atom://myplugin/image.png"
      });
      let state = [];
      let subject = DevToolsInfos(state, action);

      expect(subject).toEqual([
        { id: "toolid", name: "shell", iconUri: "atom://myplugin/image.png" }
      ]);
    });
  });
});
