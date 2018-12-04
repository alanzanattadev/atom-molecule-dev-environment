"use babel";
// @flow

const ignoreChunks = ["node_modules/", "tmp/", ".tmp", ".git"];

export const shouldIgnorePath = (path: ?string) =>
  path != null
    ? ignoreChunks.reduce(
        (ignore, chunk) => ignore || path.includes(chunk),
        false,
      )
    : true;
