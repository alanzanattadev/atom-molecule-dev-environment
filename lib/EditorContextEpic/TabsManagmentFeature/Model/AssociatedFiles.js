"use babel";
// @flow

import path from "path";

export function getBasename(filePath: string) {
  return path.parse(filePath).base.split(".")[0];
}

export function getExtension(filePath: string) {
  return "." + path.parse(filePath).base.split(".").slice(1).join(".");
}

export function getDir(filePath: string) {
  return path.parse(filePath).dir;
}

export function getAssociatedFiles(filePath: string) {
  let base = getBasename(filePath);
  let ext = getExtension(filePath);
  let dir = getDir(filePath);
  return [".test.js", ".story.js", ".js"]
    .filter(associatedExt => ext != associatedExt)
    .map(associatedExt => path.resolve(dir, base + associatedExt));
}
