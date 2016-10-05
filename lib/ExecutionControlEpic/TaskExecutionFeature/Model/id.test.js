import { generateTaskID } from "./id";

describe('id', () => {
  describe('generateTaskID', () => {
    it('should produce 20 differents values', () => {
      let subject = Array.apply(null, {length: 20}).map(generateTaskID);

      expect([...new Set(subject)].length).toBe(20);
    });
  });
});
