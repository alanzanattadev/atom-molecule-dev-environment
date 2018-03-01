"use babel";
// @flow

import type { ChangeActiveProjectsAction } from "../Types/types";

export const changeActiveProjects = (
  projects: Array<string>,
  isInit?: boolean = false,
): ChangeActiveProjectsAction => ({
  type: "CHANGE_ACTIVE_PROJECTS",
  payload: {
    projects: projects,
    isInit: isInit,
  },
});
