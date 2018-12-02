"use babel";
// @flow

import os from "os";

export default (platform: string): string => {
  return platform == "win32" ? "cmd.exe" : os.userInfo().shell || "/bin/bash";
};
