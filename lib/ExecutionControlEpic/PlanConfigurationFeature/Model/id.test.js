import { generatePlanId } from "./id";

describe("id", () => {
  describe("generatePlanId", () => {
    it("should produce 20 differents values", () => {
      let subject = Array.apply(null, { length: 20 }).map(generatePlanId);

      expect([...new Set(subject)].length).toBe(20);
    });
  });
});
