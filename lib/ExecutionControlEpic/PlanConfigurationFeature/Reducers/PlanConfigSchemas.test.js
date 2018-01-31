"use babel";
// @flow

import PlanConfigSchemas from "./PlanConfigSchemas";
import { addPlanConfigSchema } from "../Actions/AddPlanConfigSchema";
import type { AddPlanConfigSchemaAction } from "../Actions/AddPlanConfigSchema";
import { Map } from "immutable";

describe("PlanConfigSchemas", () => {
  describe("ADD_PLAN_CONFIGURATION_SCHEMA", () => {
    it("should add a plan configuration schema", () => {
      let action: AddPlanConfigSchemaAction = addPlanConfigSchema(
        {
          id: "toolid",
          name: "shell",
          iconUri: "atom://myplugin/icon.png",
          uri: "file:///file",
        },
        {
          type: "string",
          default: "test",
        },
      );
      let state = Map();
      let subject = PlanConfigSchemas(state, action);

      expect(subject).toEqual(
        Map([
          [
            "toolid",
            {
              tool: {
                id: "toolid",
                name: "shell",
                iconUri: "atom://myplugin/icon.png",
                uri: "file:///file",
              },
              type: "string",
              default: "test",
            },
          ],
        ]),
      );
    });
  });
});
