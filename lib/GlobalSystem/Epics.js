"use babel";
// @flow

import { combineEpics } from "redux-observable";
import {
  findPackages,
} from "../ProjectSystemEpic/PackageFeature/Model/FindPackages";
import Packages from "../ProjectSystemEpic/PackageFeature/Epics/Packages";

export default combineEpics(Packages(findPackages));
