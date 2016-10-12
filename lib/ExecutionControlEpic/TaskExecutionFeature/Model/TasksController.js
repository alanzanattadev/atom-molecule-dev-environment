'use babel'
// @flow
import type {TaskExecution} from "../Types/types.js.flow";
import type {TargetConfig} from "../../TargetConfigurationFeature/Types/types.js.flow";
import {areSameTargets} from "../../TargetConfigurationFeature/Model/TargetManipulators";
import kill from 'tree-kill';

export default class TasksController {

  executions: Array<TaskExecution>;

  constructor() {
    this.executions = [];
  }

  getExecutionForTaskID(taskID: string): ?TaskExecution {
    return this.executions.find(execution => execution.task.id == taskID);
  }

  getExecutionForTarget(target: TargetConfig): ?TaskExecution {
    return this.executions.find(execution => areSameTargets(execution.task.target, target));
  }

  getExecutionIndex(execution: TaskExecution): number {
    return this.executions.findIndex(e => e.task.id == execution.task.id);
  }

  kill(taskID: string): void {
    let execution = this.getExecutionForTaskID(taskID);
    if (execution) {
      kill(execution.process.pid);
      this.removeExecution(execution);
    }
  }

  killTaskWithTarget(target: TargetConfig): void {
    let execution = this.getExecutionForTarget(target);
    console.log(execution, this.executions, target);
    if (execution) {
      kill(execution.process.pid);
      this.removeExecution(execution);
    }
  }

  addExecution(execution: TaskExecution): void {
    this.executions.push(execution);
  }

  removeExecution(execution: TaskExecution): void {
    let index = this.getExecutionIndex(execution);
    if (index != -1)
      this.executions.splice(index, 1);
  }
}

export let TasksControllerInstance = new TasksController();
