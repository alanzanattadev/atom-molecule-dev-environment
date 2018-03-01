"use babel";
// @flow

import type { SetActionProjectsAction } from "../Types/types";

export const setActiveProjects = (
  projects: Map<string, any>,
): SetActionProjectsAction => ({
  type: "SET_ACTIVE_PROJECTS",
  payload: {
    projectsObservables: projects,
  },
});
