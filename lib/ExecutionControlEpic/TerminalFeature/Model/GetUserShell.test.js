import getUserShell from "./GetUserShell";
import os from "os";

describe("GetUserShell", function() {
  it("should use CMD on Windows", function() {
    let subject = getUserShell("win32");

    expect(subject).toBe("cmd.exe /c");
  });

  it("should be user' shell on Unix", function() {
    let subject = getUserShell("darwin");

    expect(subject).toBe(os.userInfo().shell);
  });
});
