"use babel";
// @flow

import { Map } from "immutable";
import type { ProjectsReducer } from "../Types/types";

export default function Projects(
  state: ProjectsReducer = Map(),
  action: any,
): ProjectsReducer {
  switch (action.type) {
    case "SET_ACTIVE_PROJECTS":
      return action.payload.projectsObservables;
    default:
      return state;
  }
}
