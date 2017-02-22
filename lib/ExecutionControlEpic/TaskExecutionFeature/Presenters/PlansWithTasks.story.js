import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import PlansWithTasks from "./PlansWithTasks";
import { StyleRoot } from "radium";

let gulpBuildPlan: PlanConfig & { state: TaskState } = {
  name: "build",
  stager: {
    type: "integrated"
  },
  config: {},
  state: "crashed",
  tool: {
    id: "1",
    name: "gulp",
    iconUri: "devtool-icon-flow.png"
  }
};
let gulpBuildTasks: Array<TaskType> = [
  {
    id: "1",
    plan: gulpBuildTasks,
    strategy: {
      type: "shell",
      command: "gulp build"
    },
    state: "crashed",
    debut: 1480425542,
    end: 1480425544
  },
  {
    id: "1",
    plan: gulpBuildTasks,
    strategy: {
      type: "shell",
      command: "gulp build"
    },
    state: "running",
    debut: 1480425542
  },
  {
    id: "1",
    plan: gulpBuildTasks,
    strategy: {
      type: "shell",
      command: "gulp build"
    },
    state: "stopped",
    debut: 1480425542,
    end: 1480425544
  },
  {
    id: "1",
    plan: gulpBuildTasks,
    strategy: {
      type: "shell",
      command: "gulp build"
    },
    state: "crashed",
    debut: 1480425542,
    end: 1480425544
  },
  {
    id: "1",
    plan: gulpBuildTasks,
    strategy: {
      type: "shell",
      command: "gulp build"
    },
    state: "crashed",
    debut: 1480425542,
    end: 1480425544
  },
  {
    id: "1",
    plan: gulpBuildTasks,
    strategy: {
      type: "shell",
      command: "gulp build"
    },
    state: "running",
    debut: 1480425542
  }
];

let gulpWatchPlan: PlanConfig & { state: TaskState } = {
  name: "watch",
  stager: {
    type: "integrated"
  },
  config: {},
  state: "crashed",
  tool: {
    id: "1",
    name: "gulp",
    iconUri: "devtool-icon-docker.png"
  }
};
let gulpWatchTasks: Array<TaskType> = [
  {
    id: "1",
    plan: gulpWatchPlan,
    strategy: {
      type: "shell",
      command: "gulp watch"
    },
    state: "crashed",
    debut: 1480425542,
    end: 1480425544
  },
  {
    id: "1",
    plan: gulpWatchPlan,
    strategy: {
      type: "shell",
      command: "gulp build"
    },
    state: "running",
    debut: 1480425542
  },
  {
    id: "1",
    plan: gulpWatchPlan,
    strategy: {
      type: "shell",
      command: "gulp build"
    },
    state: "stopped",
    debut: 1480425542,
    end: 1480425544
  },
  {
    id: "1",
    plan: gulpWatchPlan,
    strategy: {
      type: "shell",
      command: "gulp build"
    },
    state: "crashed",
    debut: 1480425542,
    end: 1480425544
  },
  {
    id: "1",
    plan: gulpWatchPlan,
    strategy: {
      type: "shell",
      command: "gulp build"
    },
    state: "crashed",
    debut: 1480425542,
    end: 1480425544
  },
  {
    id: "1",
    plan: gulpWatchPlan,
    strategy: {
      type: "shell",
      command: "gulp build"
    },
    state: "running",
    debut: 1480425542
  }
];

let gulpServePlan: PlanConfig & { state: TaskState } = {
  name: "build",
  stager: {
    type: "integrated"
  },
  config: {},
  state: "crashed",
  tool: {
    id: "1",
    name: "gulp",
    iconUri: "atom://molecule/gulp.png"
  }
};
let gulpServeTasks: Array<TaskType> = [
  {
    id: "1",
    plan: gulpServePlan,
    strategy: {
      type: "shell",
      command: "gulp serve"
    },
    state: "crashed",
    debut: 1480425542,
    end: 1480425544
  },
  {
    id: "1",
    plan: gulpServePlan,
    strategy: {
      type: "shell",
      command: "gulp serve"
    },
    state: "running",
    debut: 1480425542
  },
  {
    id: "1",
    plan: gulpServePlan,
    strategy: {
      type: "shell",
      command: "gulp serve"
    },
    state: "stopped",
    debut: 1480425542,
    end: 1480425544
  },
  {
    id: "1",
    plan: gulpServePlan,
    strategy: {
      type: "shell",
      command: "gulp serve"
    },
    state: "crashed",
    debut: 1480425542,
    end: 1480425544
  },
  {
    id: "1",
    plan: gulpServePlan,
    strategy: {
      type: "shell",
      command: "gulp serve"
    },
    state: "crashed",
    debut: 1480425542,
    end: 1480425544
  },
  {
    id: "1",
    plan: gulpServePlan,
    strategy: {
      type: "shell",
      command: "gulp serve"
    },
    state: "running",
    debut: 1480425542
  }
];

let plansWithTasks = [
  {
    plan: gulpBuildPlan,
    tasks: gulpBuildTasks
  },
  {
    plan: gulpWatchPlan,
    tasks: gulpWatchTasks
  },
  {
    plan: gulpServePlan,
    tasks: gulpServeTasks
  }
];

storiesOf("PlansWithTasks", module).add("Basic", () => (
  <StyleRoot>
    <PlansWithTasks plansWithTasks={plansWithTasks} />
  </StyleRoot>
));
