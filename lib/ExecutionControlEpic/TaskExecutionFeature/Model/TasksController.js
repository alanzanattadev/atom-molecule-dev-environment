"use babel";
// @flow

import type { TaskExecution } from "../Types/types.js.flow";
import type {
  PlanConfig,
} from "../../PlanConfigurationFeature/Types/types.js.flow";
import {
  areSamePlans,
} from "../../PlanConfigurationFeature/Model/PlanManipulators";
import kill from "tree-kill";

export default class TasksController {
  executions: Array<TaskExecution>;

  constructor() {
    this.executions = [];
  }

  getExecutionForTaskID(taskID: string): ?TaskExecution {
    return this.executions.find(execution => execution.task.id == taskID);
  }

  getExecutionForPlan(plan: PlanConfig): ?TaskExecution {
    return this.executions.find(execution =>
      areSamePlans(execution.task.plan, plan));
  }

  getExecutionIndex(execution: TaskExecution): number {
    return this.executions.findIndex(e => e.task.id == execution.task.id);
  }

  kill(taskID: string): void {
    let execution = this.getExecutionForTaskID(taskID);
    if (execution) {
      this.killTask(execution);
    }
  }

  killTaskWithPlan(plan: PlanConfig): void {
    let execution = this.getExecutionForPlan(plan);
    if (execution) {
      this.killTask(execution);
    }
  }

  killTask(execution: TaskExecution) {
    if (execution.process.pid) {
      kill(execution.process.pid);
    }
    this.removeExecution(execution);
  }

  killAll() {
    this.executions.forEach(execution => {
      this.killTask(execution);
    });
  }

  addExecution(execution: TaskExecution): void {
    this.executions.push(execution);
  }

  removeExecution(execution: TaskExecution): void {
    let index = this.getExecutionIndex(execution);
    if (index != -1) this.executions.splice(index, 1);
  }
}

export let TasksControllerInstance = new TasksController();
