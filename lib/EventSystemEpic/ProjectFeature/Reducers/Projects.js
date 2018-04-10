"use babel";
// @flow

import { List } from "immutable";
import type { ProjectsReducer } from "../Types/types";

export default function Projects(
  state: ProjectsReducer = List(),
  action: any,
): ProjectsReducer {
  switch (action.type) {
    case "SET_ACTIVE_PROJECTS":
      return action.payload.projectsPath;
    default:
      return state;
  }
}
