"use babel";
// @flow

import { Map } from "immutable";

export type ChangeActiveProjectsAction = {
  type: "CHANGE_ACTIVE_PROJECTS",
  payload: {
    projects: Array<string>,
    isInit?: boolean,
  },
};

export type SetActionProjectsAction = {
  type: "SET_ACTIVE_PROJECTS",
  payload: {
    projectsObservables: Map<string, any>,
  },
};

export type ProjectsReducer = Map<string, any>;
