"use babel";
// @flow

import { selectConfigSchemaOfTool } from "./PlanConfigSchemas";
import type { PlanConfigSchemasReducer } from "../Reducers/PlanConfigSchemas";
import { Map } from "immutable";

describe("PlanConfigSchemas Selectors", () => {
  describe("selectConfigSchemaOfTool", () => {
    it("should return config schema of specific tool", () => {
      let state: PlanConfigSchemasReducer = Map([
        [
          "tool1",
          {
            type: "string",
            default: "",
            tool: {
              iconUri: "atom://myplugin/icon.png",
              id: "tool1",
              name: "docker",
            },
          },
        ],
        [
          "tool2",
          {
            type: "number",
            default: 5,
            tool: {
              iconUri: "atom://myplugin/icon.png",
              id: "tool2",
              name: "gulp",
            },
          },
        ],
        [
          "tool3",
          {
            type: "boolean",
            default: true,
            tool: {
              iconUri: "atom://myplugin/icon.png",
              id: "tool3",
              name: "nightwatch",
            },
          },
        ],
      ]);
      let subject = selectConfigSchemaOfTool(state, "tool2");

      expect(subject).toEqual({
        type: "number",
        default: 5,
        tool: {
          iconUri: "atom://myplugin/icon.png",
          id: "tool2",
          name: "gulp",
        },
      });
    });
  });
});
