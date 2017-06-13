"use strict";
// @flow
const spawn = require("child_process").spawnSync;

if (process.platform === "win32") {
  const atom_version = spawn("cmd.exe", ["/c", "atom -v"]);
  const electron_version = atom_version.stdout
    .toString()
    .split("\n")[2]
    .split(":")[1]
    .replace(/\s+/g, "");
  spawn("cmd.exe", [
    "/c",
    "npm",
    "rebuild",
    "--runtime=electron",
    `--target=${electron_version}`,
    "--disturl=https://atom.io/download/atom-shell",
    "--build-from-source",
  ]);
} else {
  const atom_version = spawn("bash", ["-c", "atom -v"]);
  const electron_version = atom_version.stdout
    .toString()
    .split("\n")[2]
    .split(":")[1]
    .replace(/\s+/g, "");
  spawn("bash", [
    "-c",
    "npm",
    "rebuild",
    "--runtime=electron",
    `--target=${electron_version}`,
    "--disturl=https://atom.io/download/atom-shell",
    "--build-from-source",
  ]);
}
