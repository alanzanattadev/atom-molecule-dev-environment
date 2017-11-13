"use babel";
// @flow

import { ON_MODIFIED } from "../Model/fileEventsHelpers.js";
import type { WatchMode } from "../Types/types.flow.js";

const watchPathSetter = (mode: WatchMode) => (
  path: string,
  options: Object,
  callback: Function,
) => {
  const fakeFile = [{ path: "/this/is/a/fake/dir/file.js", action: mode }];
  if (mode === ON_MODIFIED) {
    callback(fakeFile);
    callback(fakeFile);
    callback(fakeFile);
  } else {
    callback(fakeFile);
  }
};

export default watchPathSetter;
