'use babel'
// @flow

import type {Task} from "../../Types/types.js.flow";
import {gulpBuild, dockerWeb, dockerDB} from "../../../TargetConfigurationFeature/Fake/Data/TargetConfig";

export let gulpBuild1: Task = {
  id: '1',
  target: gulpBuild,
  debut: 1477600095,
  strategy: {
    type: "shell",
    command: "gulp build"
  },
  state: 'running',
};

export let dockerWeb1: Task = {
  id: '2',
  target: dockerWeb,
  debut: 1477600096,
  strategy: {
    type: "shell",
    command: "docker run web"
  },
  state: 'running',
};

export let dockerWeb2: Task = {
  id: '3',
  target: dockerWeb,
  debut: 1477600093,
  end: 1477600095,
  strategy: {
    type: "shell",
    command: "docker run web"
  },
  state: 'stopped',
};

export let dockerWeb3: Task = {
  id: '4',
  target: dockerWeb,
  debut: 1477600097,
  strategy: {
    type: "shell",
    command: "docker run web"
  },
  state: 'running',
};

export let dockerDB1: Task = {
  id: '5',
  target: dockerDB,
  debut: 1477600038,
  end: 1477600048,
  strategy: {
    type: "shell",
    command: "docker run db"
  },
  state: 'crashed',
};

export let dockerDB2: Task = {
  target: dockerDB,
  id: '6',
  debut: 1477600095,
  strategy: {
    type: "shell",
    command: "docker run db"
  },
  state: 'running',
};

let tasks: Array<Task> = [gulpBuild1, dockerWeb1, dockerWeb2, dockerWeb3, dockerDB1, dockerDB2];

export default tasks;
