"use babel";
// @flow

import Execution from "./Execution";

export class ExecutionsController {
  executions: { [taskId: string]: Execution };
  constructor() {
    this.executions = {};
  }

  getExecution(taskId: string): ?Execution {
    return this.executions[taskId];
  }

  setExecution(execution: Execution): void {
    this.executions[execution.task.id] = execution;
  }
}

export default new ExecutionsController();
