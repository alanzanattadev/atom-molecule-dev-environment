import getUserShell from "./GetUserShell";
import os from "os";

describe("GetUserShell", function() {
  it("should be user' shell", function() {
    let subject = getUserShell(os.platform);

    if (os.platform() != "win32") expect(subject).toBe(os.userInfo().shell);
    else expect(subject).toBe("cmd.exe");
  });
});
