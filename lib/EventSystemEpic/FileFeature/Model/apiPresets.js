"use babel";
// @flow

export const apiPresets = {
  any: {
    expression: ["anyof", ["match", "*"], ["match", ".*"]],
  },
  js: {
    expression: ["allof", ["match", "*.js"]],
  },
};
