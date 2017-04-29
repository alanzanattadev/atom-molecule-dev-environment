"use babel";
// @flow

import React from "react";
import { storiesOf } from "@kadira/storybook";
import PlanWithTasks from "./PlanWithTasks";

let plan: PlanConfig & { state: TaskState } = {
  name: "build",
  stager: {
    type: "integrated",
  },
  config: {},
  state: "crashed",
  tool: {
    id: "1",
    name: "gulp",
    iconUri: "devtool-icon-flow.png",
  },
};
let tasks: Array<TaskType> = [
  {
    id: "1",
    plan: plan,
    strategy: {
      type: "shell",
      command: "gulp build",
    },
    state: "crashed",
    debut: 1480425542,
    end: 1480425544,
  },
  {
    id: "1",
    plan: plan,
    strategy: {
      type: "shell",
      command: "gulp build",
    },
    state: "running",
    debut: 1480425542,
  },
  {
    id: "1",
    plan: plan,
    strategy: {
      type: "shell",
      command: "gulp build",
    },
    state: "stopped",
    debut: 1480425542,
    end: 1480425544,
  },
  {
    id: "1",
    plan: plan,
    strategy: {
      type: "shell",
      command: "gulp build",
    },
    state: "crashed",
    selected: true,
    debut: 1480425542,
    end: 1480425544,
  },
  {
    id: "1",
    plan: plan,
    strategy: {
      type: "shell",
      command: "gulp build",
    },
    state: "crashed",
    debut: 1480425542,
    end: 1480425544,
  },
  {
    id: "1",
    plan: plan,
    strategy: {
      type: "shell",
      command: "gulp build",
    },
    state: "running",
    debut: 1480425542,
  },
];

storiesOf("PlanWithTasks", module).add("Basic", () => (
  <PlanWithTasks plan={plan} tasks={tasks} />
));
