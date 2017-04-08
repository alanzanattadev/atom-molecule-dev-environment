import { getDefault } from "./PlanConfigManipulators";

describe("PlanConfigManipulators", () => {
  describe("Default getters", () => {
    it("should get default value of an object", () => {
      let config = {
        type: "object",
        schemas: {
          sentence: {
            type: "string",
            default: "salut",
          },
          age: {
            type: "number",
            default: 3,
          },
        },
      };
      let subject = getDefault(config);

      expect(subject).toEqual({ sentence: "salut", age: 3 });
    });

    it("should get default value of an array", () => {
      let config = {
        type: "array",
        default: [],
        items: {
          type: "string",
          default: "",
        },
      };
      let subject = getDefault(config);

      expect(subject).toEqual([]);
    });

    it("should get default value of a number", () => {
      let config = {
        type: "number",
        default: 3,
      };
      let subject = getDefault(config);

      expect(subject).toBe(3);
    });

    it("should get default value of a string", () => {
      let config = {
        type: "string",
        default: "placeholder",
      };
      let subject = getDefault(config);

      expect(subject).toBe("placeholder");
    });

    it("should get default value of a conditionnal group", () => {
      let config = {
        type: "conditional",
        expression: {
          type: "boolean",
          default: false,
        },
        cases: {
          true: {
            type: "string",
            default: "salut",
          },
          false: {
            type: "number",
            default: 3,
          },
        },
      };
      let subject = getDefault(config);

      expect(subject).toEqual({ expressionValue: false, caseValue: 3 });
    });

    it("should get default value of an enum", () => {
      let config = {
        type: "enum",
        default: "on-failure",
        enum: [
          {
            value: "no",
            description: "No",
          },
          {
            value: "always",
            description: "Always",
          },
          {
            value: "on-failure",
            description: "On Failure",
          },
          {
            value: "unless-stopped",
            description: "Unless Stopped",
          },
        ],
      };
      let subject = getDefault(config);

      expect(subject).toBe("on-failure");
    });

    it("should get default value of a boolean", () => {
      let config = {
        type: "boolean",
        default: true,
      };
      let subject = getDefault(config);

      expect(subject).toBe(true);
    });
  });
});
