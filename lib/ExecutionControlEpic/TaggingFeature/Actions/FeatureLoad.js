"use babel";
// @flow

export type featureLoadAction = {
  type: "FEATURE_LOAD",
  payload: {
    featureName: string,
  },
};

export function featureLoad(name: string): featureLoadAction {
  return {
    type: "FEATURE_LOAD",
    payload: {
      featureName: name,
    },
  };
}
