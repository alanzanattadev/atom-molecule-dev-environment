"use babel";
// @flow

export function filterAtomEnv(env: Object) {
  const filteredVars = ["ATOM_HOME", "NODE_PATH"];

  return Object.entries(env).reduce((newEnv, [key, value]) => {
    if (filteredVars.find(v => v === key) != null) return newEnv;
    return { ...newEnv, [key]: value };
  }, {});
}
