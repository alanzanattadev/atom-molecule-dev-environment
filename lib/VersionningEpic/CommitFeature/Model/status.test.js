import { getStatusesFromStatusOutput } from "./status";
import type { File } from "../Types/types.js";

describe("Status", () => {
  describe("getStatusesFromStatusOutput", () => {
    it("should return file list", () => {
      let subject: Array<File> = getStatusesFromStatusOutput(
        `
          M file
        ??  package.json
        ??  .gitignore
        D   .npm-debug.log
      `,
      );

      expect(subject.length).toBe(4);
      expect(subject[0].status).toBe("modified");
      expect(subject[0].path).toBe("file");
      expect(subject[1].status).toBe("added");
      expect(subject[1].path).toBe("package.json");
      expect(subject[2].status).toBe("added");
      expect(subject[2].path).toBe(".gitignore");
      expect(subject[3].status).toBe("removed");
      expect(subject[3].path).toBe(".npm-debug.log");
    });
  });
});
