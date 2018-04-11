"use babel";
// @flow

import { List } from "immutable";
import type { SetActionProjectsAction } from "../Types/types";

export const setActiveProjects = (
  projects: List<string>,
): SetActionProjectsAction => ({
  type: "SET_ACTIVE_PROJECTS",
  payload: {
    projectsPath: projects,
  },
});
