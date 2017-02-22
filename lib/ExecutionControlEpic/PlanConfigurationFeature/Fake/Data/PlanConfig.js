"use babel";
// @flow

import type { PlanConfig } from "../../Types/types.js.flow";
import {
  gulp,
  docker,
  npm
} from "../../../DevToolsSummaryFeature/Fake/Data/DevTools";

export let gulpBuild: PlanConfig = {
  tool: gulp,
  config: "build",
  name: "build",
  pinned: false,
  stager: { type: "integrated" }
};

export let gulpWatch: PlanConfig = {
  tool: gulp,
  config: "watch",
  name: "watch",
  pinned: false,
  stager: { type: "integrated" }
};

export let dockerWeb: PlanConfig = {
  tool: docker,
  config: {
    image: "node"
  },
  stager: { type: "integrated" },
  name: "web",
  pinned: false
};

export let dockerDB: PlanConfig = {
  tool: docker,
  config: {
    image: "mongo"
  },
  stager: { type: "integrated" },
  name: "db",
  pinned: false
};

export let npmRunBuild: PlanConfig = {
  tool: npm,
  config: {
    type: "run",
    script: "build"
  },
  stager: { type: "integrated" },
  name: "run build",
  pinned: false
};

export let npmRunServe: PlanConfig = {
  tool: npm,
  config: {
    type: "run",
    script: "serve"
  },
  stager: { type: "integrated" },
  name: "run serve",
  pinned: false
};

let planConfigs: Array<PlanConfig> = [
  gulpBuild,
  gulpWatch,
  dockerWeb,
  dockerDB,
  npmRunBuild,
  npmRunServe
];

export default planConfigs;
