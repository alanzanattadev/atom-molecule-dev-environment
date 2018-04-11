"use babel";
// @flow

import { List } from "immutable";

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
    projectsPath: List<string>,
  },
};

export type ProjectsReducer = List<string>;
