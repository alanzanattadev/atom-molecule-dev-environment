import React from "react";
import { shallow, mount } from "enzyme";
import PlansWithTasks from "./PlansWithTasks";
import type { Task as TaskType, TaskState } from "../Types/types.js.flow";
import type {
  PlanConfig
} from "../../PlanConfigurationFeature/Types/types.js.flow";
import { StyleRoot } from "radium";
import PlanWithTasks from "./PlanWithTasks";

describe("PlansWithTasks", () => {
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
      iconUri: "atom://molecule/gulp.png"
    }
  };
  let gulpBuildTasks: Array<TaskType> = [
    {
      id: "1",
      plan: gulpBuildPlan,
      strategy: {
        type: "shell",
        command: "gulp build"
      },
      state: "crashed",
      debut: 1480425542,
      end: 1480425544
    },
    {
      id: "2",
      plan: gulpBuildPlan,
      strategy: {
        type: "shell",
        command: "gulp build"
      },
      state: "running",
      debut: 1480425542
    },
    {
      id: "3",
      plan: gulpBuildPlan,
      strategy: {
        type: "shell",
        command: "gulp build"
      },
      state: "stopped",
      debut: 1480425542,
      end: 1480425544
    },
    {
      id: "4",
      plan: gulpBuildPlan,
      strategy: {
        type: "shell",
        command: "gulp build"
      },
      state: "crashed",
      debut: 1480425542,
      end: 1480425544
    },
    {
      id: "5",
      plan: gulpBuildPlan,
      strategy: {
        type: "shell",
        command: "gulp build"
      },
      state: "crashed",
      debut: 1480425542,
      end: 1480425544
    },
    {
      id: "6",
      plan: gulpBuildPlan,
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
      iconUri: "atom://molecule/gulp.png"
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
      id: "2",
      plan: gulpWatchPlan,
      strategy: {
        type: "shell",
        command: "gulp build"
      },
      state: "running",
      debut: 1480425542
    },
    {
      id: "3",
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
      id: "4",
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
      id: "5",
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
      id: "6",
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
    name: "serve",
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
      id: "2",
      plan: gulpServePlan,
      strategy: {
        type: "shell",
        command: "gulp serve"
      },
      state: "running",
      debut: 1480425542
    },
    {
      id: "3",
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
      id: "4",
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
      id: "5",
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
      id: "6",
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

  it("should display many PlanWithTasks", () => {
    let subject = mount(
      <StyleRoot>
        <PlansWithTasks plansWithTasks={plansWithTasks} />
      </StyleRoot>
    );

    expect(subject.find(PlanWithTasks).length).toBe(3);
  });

  it("should call onPlanClick on plan click", () => {
    let spy = jest.fn();
    let subject = mount(
      <StyleRoot>
        <PlansWithTasks plansWithTasks={plansWithTasks} onPlanClick={spy} />
      </StyleRoot>
    );

    subject.find(PlanWithTasks).at(1).prop("onPlanClick")(
      plansWithTasks[1].plan
    );

    expect(spy).toBeCalledWith(plansWithTasks[1].plan);
  });

  it("should call onTaskClick on task click", () => {
    let spy = jest.fn();
    let subject = mount(
      <StyleRoot>
        <PlansWithTasks plansWithTasks={plansWithTasks} onTaskClick={spy} />
      </StyleRoot>
    );

    subject.find(PlanWithTasks).at(1).prop("onTaskClick")(
      plansWithTasks[1].tasks[1]
    );

    expect(spy).toBeCalledWith(plansWithTasks[1].tasks[1]);
  });
});
