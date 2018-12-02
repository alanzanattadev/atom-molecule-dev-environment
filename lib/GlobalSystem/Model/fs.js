"use babel";
// @flow

import path from "path";
import mkdirp from "mkdirp";

const tmpPluginsFolder =
  process.platform == "win32"
    ? path.join(
        process.env["TEMP"] || process.env["TMP"] || path.sep,
        "Molecule",
        "Plugins",
      )
    : path.join(path.sep, "tmp", "molecule", "plugins");

export function createAppFolders(): void {
  mkdirp.sync(tmpPluginsFolder);
}

createAppFolders();

export function getTmpAppPluginFolder(): string {
  return tmpPluginsFolder;
}
