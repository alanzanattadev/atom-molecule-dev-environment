"use babel";
// @flow

import type { TasksReducer } from "./Tasks";
import { TasksReducerRecord } from "./Tasks";
import Tasks from "./Tasks";
import type { AddTaskAction } from "../Actions/AddTask";
import { addTask } from "../Actions/AddTask";
import type { CrashTaskAction } from "../Actions/CrashTask";
import { crashTask } from "../Actions/CrashTask";
import type { StopTaskAction } from "../Actions/StopTask";
import { stopTask } from "../Actions/StopTask";
import type { StartTaskAction } from "../Actions/StartTask";
import { startTask } from "../Actions/StartTask";
import type { SucceedTaskAction } from "../Actions/SucceedTask";
import { succeedTask } from "../Actions/SucceedTask";
import type { FailTaskAction } from "../Actions/FailTask";
import { failTask } from "../Actions/FailTask";
import type { StopTaskOfPlanAction } from "../Actions/StopTaskOfPlan";
import { stopTaskOfPlan } from "../Actions/StopTaskOfPlan";
import type { BusyTaskAction } from "../Actions/BusyTask";
import { busyTask } from "../Actions/BusyTask";
import type { WaitingTaskAction } from "../Actions/WaitingTask";
import { waitingTask } from "../Actions/WaitingTask";
import { Map, List } from "immutable";

describe("Tasks Reducer", () => {
  describe("ADD_TASK", () => {
    it("should add a task", () => {
      let action: AddTaskAction = addTask(
        "1",
        {
          id: "1",
          config: 2,
          packageInfo: {
            name: "root",
            type: "file",
            path: "/",
          },
          stager: { type: "integrated", host: null },
          tool: { id: "3", name: "tool", iconUri: "", uri: "" },
        },
        { type: "shell", command: "ls", cwd: "/etc" },
        1475954335,
      );
      let state: TasksReducer = new TasksReducerRecord();
      let subject = Tasks(state, action);

      expect(subject).toEqual(
        new TasksReducerRecord({
          byTaskID: Map([
            [
              "1",
              {
                id: "1",
                plan: {
                  id: "1",
                  config: 2,
                  packageInfo: {
                    name: "root",
                    type: "file",
                    path: "/",
                  },
                  stager: { type: "integrated", host: null },
                  tool: { id: "3", name: "tool", iconUri: "", uri: "" },
                },
                strategy: { type: "shell", command: "ls", cwd: "/etc" },
                step: 0,
                state: "created",
                debut: 1475954335,
                busy: false,
                terminal: true,
              },
            ],
          ]),
          byPlanID: Map([["1", List(["1"])]]),
          byToolID: Map([["3", List(["1"])]]),
        }),
      );
    });
  });

  describe("START_TASK", () => {
    it("should mark the task as started", () => {
      let action: StartTaskAction = startTask("2");
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2", "3"])]]),
        byToolID: Map([["1", List(["1", "2", "3"])]]),
      });
      let subject = Tasks(state, action);

      expect(subject).toMatchSnapshot();
    });
  });

  describe("STOP_TASK", () => {
    it("should mark the task as stopped", () => {
      let action: StopTaskAction = stopTask("2", "2", 1475954336);
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "/ok" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              state: "running",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "/ok" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "/ok" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2", "3"])]]),
        byToolID: Map([["1", List(["1", "2", "3"])]]),
      });
      let subject = Tasks(state, action);

      expect(subject).toMatchSnapshot();
    });
  });

  describe("STOP_TASK_OF_PLAN", () => {
    it("should mark the task as stopped", () => {
      let action: StopTaskOfPlanAction = stopTaskOfPlan(
        {
          id: "2",
          name: "my Plan",
          config: 2,
          packageInfo: {
            name: "root",
            type: "file",
            path: "/",
          },
          stager: { type: "integrated", host: null },
          tool: { id: "2", name: "tool", iconUri: "", uri: "" },
          state: "running",
        },
        1475954336,
      );
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              state: "running",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "2",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "2",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "3"])], ["2", List(["2"])]]),
        byToolID: Map([["1", List(["1", "3"])], ["2", List(["2"])]]),
      });
      let subject = Tasks(state, action);

      expect(subject).toMatchSnapshot();
    });
  });

  describe("CRASH_TASK", () => {
    it("should mark the task as crashed", () => {
      let action: CrashTaskAction = crashTask("2", "2", 1475954336);
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              state: "running",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2", "3"])]]),
        byToolID: Map([["1", List(["1", "2", "3"])]]),
      });
      let subject = Tasks(state, action);

      expect(subject).toMatchSnapshot();
    });
  });

  describe("SUCCEED_TASK", () => {
    it("should mark the task as succeed", () => {
      let action: SucceedTaskAction = succeedTask("2", 1475954336);
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              state: "running",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2", "3"])]]),
        byToolID: Map([["1", List(["1", "2", "3"])]]),
      });
      let subject = Tasks(state, action);

      expect(subject).toMatchSnapshot();
    });
  });

  describe("FAIL_TASK", () => {
    it("should mark the task as failed", () => {
      let action: FailTaskAction = failTask("2", "2", 1475954336);
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              state: "running",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2", "3"])]]),
        byToolID: Map([["1", List(["1", "2", "3"])]]),
      });
      let subject = Tasks(state, action);

      expect(subject).toMatchSnapshot();
    });
  });

  describe("BUSY_TASK", () => {
    it("should mark the task as busy", () => {
      let action: BusyTaskAction = busyTask("2");
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              state: "running",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2", "3"])]]),
        byToolID: Map([["1", List(["1", "2", "3"])]]),
      });
      let subject = Tasks(state, action);

      expect(subject).toMatchSnapshot();
    });
  });

  describe("WAITING_TASK", () => {
    it("should mark the task as waiting", () => {
      let action: WaitingTaskAction = waitingTask("2");
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              state: "running",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              state: "created",
              debut: 1475954335,
              strategy: { type: "shell", command: "", cwd: "" },
              plan: {
                id: "1",
                config: 2,
                packageInfo: {
                  name: "root",
                  type: "file",
                  path: "/",
                },
                stager: { type: "integrated", host: null },
                tool: {
                  id: "1",
                  name: "tool",
                  iconUri: "",
                },
              },
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2", "3"])]]),
        byToolID: Map([["1", List(["1", "2", "3"])]]),
      });
      let subject = Tasks(state, action);

      expect(subject).toMatchSnapshot();
    });
  });
});
