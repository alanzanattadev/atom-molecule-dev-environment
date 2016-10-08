'use babel'
// @flow

import Tasks from "./Tasks";
import type {TasksReducer} from "./Tasks";
import type {AddTaskAction} from "../Actions/AddTask";
import {addTask} from "../Actions/AddTask";
import type {CrashTaskAction} from "../Actions/CrashTask";
import {crashTask} from "../Actions/CrashTask";
import type {StopTaskAction} from "../Actions/StopTask";
import {stopTask} from "../Actions/StopTask";
import type {StartTaskAction} from "../Actions/StartTask";
import {startTask} from "../Actions/StartTask";
import type {SucceedTaskAction} from "../Actions/SucceedTask";
import {succeedTask} from "../Actions/SucceedTask";
import type {FailTaskAction} from "../Actions/FailTask";
import {failTask} from "../Actions/FailTask";

describe('Tasks Reducer', () => {
  describe('ADD_TASK', () => {
    it('should add a task', () => {
      let action: AddTaskAction = addTask("1", {config: 2, tool: {id: "3", name: "tool", iconUri: ""}}, 1475954335);
      let state: TasksReducer = [];
      let subject = Tasks(state, action);

      expect(subject).toEqual([action.payload.task]);
    });

  });

  describe('START_TASK', () => {
    it('should mark the task as started', () => {
      let action: StartTaskAction = startTask("2");
      let state: TasksReducer = [{
        id: "1",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "2",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "3",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }];
      let subject = Tasks(state, action);

      expect(subject).toEqual([{
        id: "1",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "2",
        state: "running",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "3",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }]);
    });

  });

  describe('STOP_TASK', () => {
    it('should mark the task as stopped', () => {
      let action: StopTaskAction = stopTask("2", 1475954336);
      let state: TasksReducer = [{
        id: "1",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "2",
        state: "running",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "3",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }];
      let subject = Tasks(state, action);

      expect(subject).toEqual([{
        id: "1",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "2",
        state: "stopped",
        debut: 1475954335,
        end: 1475954336,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "3",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }]);
    });
  });

  describe('CRASH_TASK', () => {
    it('should mark the task as crashed', () => {
      let action: CrashTaskAction = crashTask("2", 1475954336);
      let state: TasksReducer = [{
        id: "1",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "2",
        state: "running",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "3",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }];
      let subject = Tasks(state, action);

      expect(subject).toEqual([{
        id: "1",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "2",
        state: "crashed",
        debut: 1475954335,
        end: 1475954336,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "3",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }]);
    });
  });

  describe('SUCCEED_TASK', () => {
    it('should mark the task as succeed', () => {
      let action: SucceedTaskAction = succeedTask("2", 1475954336);
      let state: TasksReducer = [{
        id: "1",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "2",
        state: "running",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "3",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }];
      let subject = Tasks(state, action);

      expect(subject).toEqual([{
        id: "1",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "2",
        state: "succeed",
        debut: 1475954335,
        end: 1475954336,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "3",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }]);
    });
  });

  describe('FAIL_TASK', () => {
    it('should mark the task as failed', () => {
      let action: FailTaskAction = failTask("2", 1475954336);
      let state: TasksReducer = [{
        id: "1",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "2",
        state: "running",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "3",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }];
      let subject = Tasks(state, action);

      expect(subject).toEqual([{
        id: "1",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "2",
        state: "failed",
        debut: 1475954335,
        end: 1475954336,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }, {
        id: "3",
        state: "created",
        debut: 1475954335,
        target: {
          config: 2,
          tool: {
            id: "1",
            name: "tool",
            iconUri: ""
          }
        }
      }]);
    });
  });
});
