"use babel";

import Rx from "rxjs";

/*
generateEntry(true, "/", "firstDir"),
generateEntry(false, "/firstDir", "package.json"),
generateEntry(true, "/", "secondDir"),
generateEntry(false, "/secondDir", "jest.config"),
*/

export function findPackages() {
  let fakePackages = [
    {
      name: "package.json",
      path: "/firstDir/package.json",
      type: "file",
      plugin: {
        tool: { name: "toolName", id: "1", iconUri: "toolIcon" },
      },
    },
  ];
  return Rx.Observable.of(fakePackages);
}
