"use babel";
// @flow

import PlanConfigSchemas from "./PlanConfigSchemas";
import type { AddPlanConfigSchemaAction } from "../Actions/AddPlanConfigSchema";
import { addPlanConfigSchema } from "../Actions/AddPlanConfigSchema";

describe("PlanConfigSchemas", () => {
  describe("ADD_PLAN_CONFIGURATION_SCHEMA", () => {
    it("should add a plan configuration schema", () => {
      let action: AddPlanConfigSchemaAction = addPlanConfigSchema(
        {
          id: "toolid",
          name: "shell",
          iconUri: "atom://myplugin/icon.png",
        },
        {
          type: "string",
          default: "test",
        },
      );
      let state = [];
      let subject = PlanConfigSchemas(state, action);

      expect(subject).toEqual([
        {
          tool: {
            id: "toolid",
            name: "shell",
            iconUri: "atom://myplugin/icon.png",
          },
          type: "string",
          default: "test",
        },
      ]);
    });
  });
});
