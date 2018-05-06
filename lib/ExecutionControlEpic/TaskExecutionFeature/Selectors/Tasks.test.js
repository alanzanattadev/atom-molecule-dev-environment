"use babel";
// @flow

import type { TasksReducer } from "../Reducers/Tasks";
import { TasksReducerRecord } from "../Reducers/Tasks";
import {
  selectStateOfPlan,
  selectStateOfTool,
  selectTaskIDOfRunningPlan,
} from "./Tasks";
import { Map, List } from "immutable";

describe("Tasks Selectors", () => {
  let dockerTool = { iconUri: "", name: "docker", id: "1" };
  let gulpTool = { iconUri: "", name: "gulp", id: "2" };
  let buildPlan = "build";
  let runPlan = "run";
  let integratedStrategy = { type: "shell", command: "", cwd: "/" };
  describe("selectStateOfPlan", () => {
    it("should return running when one of tasks is running", () => {
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "created",
              debut: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "failed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "running",
              debut: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "4",
            {
              id: "4",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "succeed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "5",
            {
              id: "5",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2", "3", "4", "5"])]]),
        byToolID: Map([["1", List(["1", "2", "3", "4", "5"])]]),
      });
      let subject = selectStateOfPlan(state, {
        stager: { type: "integrated", host: null },
        config: buildPlan,
        tool: dockerTool,
        id: "1",
      });

      expect(subject).toBe("running");
    });

    it("should return crashed when no task is running and the last one has crashed", () => {
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "failed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954335,
              end: 1475954336,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "4",
            {
              id: "4",
              plan: {
                stager: { type: "integrated", host: null },
                config: runPlan,
                tool: dockerTool,
              },
              state: "failed",
              debut: 1475954335,
              end: 1475954337,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "5",
            {
              id: "5",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "stopped",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2", "3", "5"])], ["2", List("4")]]),
        byToolID: Map([["1", List(["1", "2", "3", "4", "5"])]]),
      });

      let subject = selectStateOfPlan(state, {
        stager: { type: "integrated", host: null },
        config: buildPlan,
        tool: dockerTool,
        id: "1",
      });

      expect(subject).toBe("crashed");
    });

    it("should return succeed when no task is running and the last one has succeed", () => {
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "succeed",
              debut: 1475954335,
              end: 1475954336,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "4",
            {
              id: "4",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "succeed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "5",
            {
              id: "5",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "failed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2", "3", "4", "5"])]]),
        byToolID: Map([["1", List(["1", "2", "3", "4", "5"])]]),
      });

      let subject = selectStateOfPlan(state, {
        stager: { type: "integrated", host: null },
        config: buildPlan,
        tool: dockerTool,
        id: "1",
      });

      expect(subject).toBe("succeed");
    });

    it("should return failed when no task is running and the last one has failed", () => {
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "failed",
              debut: 1475954335,
              end: 1475954336,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "stopped",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "4",
            {
              id: "4",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "succeed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "5",
            {
              id: "5",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2", "3", "4", "5"])]]),
        byToolID: Map([["1", List(["1", "2", "3", "4", "5"])]]),
      });

      let subject = selectStateOfPlan(state, {
        stager: { type: "integrated", host: null },
        config: buildPlan,
        tool: dockerTool,
        id: "1",
      });

      expect(subject).toBe("failed");
    });

    it("should return stopped when no task is running and the last one has been stopped", () => {
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "stopped",
              debut: 1475954335,
              end: 1475954337,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "4",
            {
              id: "4",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "failed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "5",
            {
              id: "5",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "succeed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2", "3", "4", "5"])]]),
        byToolID: Map([["1", List(["1", "2", "3", "4", "5"])]]),
      });

      let subject = selectStateOfPlan(state, {
        stager: { type: "integrated", host: null },
        config: buildPlan,
        tool: dockerTool,
        id: "1",
      });

      expect(subject).toBe("stopped");
    });

    it("should return created when no task is running", () => {
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "created",
              debut: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "created",
              debut: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2"])]]),
        byToolID: Map([["1", List(["1", "2"])]]),
      });
      let subject = selectStateOfPlan(state, {
        stager: { type: "integrated", host: null },
        config: buildPlan,
        tool: dockerTool,
        id: "1",
      });

      expect(subject).toBe("created");
    });

    it("should return null when no task is existing for plan", () => {
      let state: TasksReducer = new TasksReducerRecord();
      let subject = selectStateOfPlan(state, {
        stager: { type: "integrated", host: null },
        config: buildPlan,
        tool: dockerTool,
        id: "1",
      });

      expect(subject).toBe(null);
    });
  });

  describe("selectStateOfTool", () => {
    it("should return running when one of tool's plan is running", () => {
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "running",
              debut: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "failed",
              debut: 1475954336,
              end: 1475954337,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954337,
              end: 1475954338,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "4",
            {
              id: "4",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "created",
              debut: 1475954333,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2", "3", "4"])]]),
        byToolID: Map([["1", List(["1", "2", "3", "4"])]]),
      });
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("running");
    });

    it("should return stopped when no tool's plan is running and the last one has been stopped", () => {
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954334,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "stopped",
              debut: 1475954334,
              end: 1475954336,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "failed",
              debut: 1475954334,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "4",
            {
              id: "4",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "succeed",
              debut: 1475954334,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "5",
            {
              id: "5",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "created",
              debut: 1475954334,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "6",
            {
              id: "6",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: gulpTool,
              },
              state: "crashed",
              debut: 1475954334,
              end: 1475954339,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([
          ["1", List(["1", "2", "3", "4", "5"])],
          ["2", List(["6"])],
        ]),
        byToolID: Map([
          ["1", List(["1", "2", "3", "4", "5"])],
          ["2", List(["6"])],
        ]),
      });
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("stopped");
    });

    it("should return crashed when no tool's plan is running and the last one has crashed", () => {
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "stopped",
              debut: 1475954334,
              end: 1475954334,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              plan: {
                stager: { type: "integrated", host: null },
                config: runPlan,
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954334,
              end: 1475954333,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954334,
              end: 1475954339,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "4",
            {
              id: "4",
              plan: {
                stager: { type: "integrated", host: null },
                config: runPlan,
                tool: dockerTool,
              },
              state: "failed",
              debut: 1475954334,
              end: 1475954338,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "5",
            {
              id: "5",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: gulpTool,
              },
              state: "failed",
              debut: 1475954334,
              end: 1475954340,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "6",
            {
              id: "6",
              plan: {
                stager: { type: "integrated", host: null },
                config: runPlan,
                tool: gulpTool,
              },
              state: "succeed",
              debut: 1475954334,
              end: 1475954338,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([
          ["1", List(["1", "3"])],
          ["2", List(["2", "4"])],
          ["3", List(["5"])],
          ["4", List(["6"])],
        ]),
        byToolID: Map([
          ["1", List(["1", "2", "3", "4"])],
          ["2", List(["5", "6"])],
        ]),
      });

      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("crashed");
    });

    it("should return succeed when no tool's plan is running and the last one has succeed", () => {
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "stopped",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "succeed",
              debut: 1475954335,
              end: 1475954336,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "4",
            {
              id: "4",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "failed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "5",
            {
              id: "5",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: gulpTool,
              },
              state: "failed",
              debut: 1475954335,
              end: 1475954339,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2", "3", "4"])], ["2", List(["5"])]]),
        byToolID: Map([["1", List(["1", "2", "3", "4"])], ["2", List(["5"])]]),
      });

      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("succeed");
    });

    it("should return failed when no tool's plan is running and the last one has failed", () => {
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "succeed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "failed",
              debut: 1475954335,
              end: 1475954336,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "4",
            {
              id: "4",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "stopped",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "5",
            {
              id: "5",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: gulpTool,
              },
              state: "succeed",
              debut: 1475954335,
              end: 1475954339,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2", "3", "4"])], ["2", List(["5"])]]),
        byToolID: Map([["1", List(["1", "2", "3", "4"])], ["2", List(["5"])]]),
      });

      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("failed");
    });

    it("should return created when no tool's plan is running", () => {
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "created",
              debut: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "created",
              debut: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: dockerTool,
              },
              state: "created",
              debut: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "4",
            {
              id: "4",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: gulpTool,
              },
              state: "running",
              debut: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1", "2", "3"])], ["2", List(["4"])]]),
        byToolID: Map([["1", List(["1", "2", "3"])], ["2", List(["4"])]]),
      });

      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("created");
    });

    it("should return null when no tool's plan exists for tool", () => {
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              plan: {
                stager: { type: "integrated", host: null },
                config: buildPlan,
                tool: gulpTool,
              },
              state: "running",
              debut: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              plan: {
                stager: { type: "integrated", host: null },
                config: runPlan,
                tool: gulpTool,
              },
              state: "crashed",
              debut: 1475954335,
              end: 1475954336,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([["1", List(["1"])], ["2", List(["2"])]]),
        byToolID: Map([["2", List(["1", "2"])]]),
      });
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe(null);
    });

    it("should return null when no tool's plan exists", () => {
      let state: TasksReducer = new TasksReducerRecord();
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe(null);
    });
  });

  describe("selectTaskIDOfRunningPlan", () => {
    it("should return the taskID of running plan", () => {
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              plan: {
                stager: { type: "integrated", host: null },
                config: "run web",
                tool: dockerTool,
              },
              state: "running",
              debut: 1475954335,
              end: 1475954337,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              plan: {
                stager: { type: "integrated", host: null },
                config: "run db",
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              plan: {
                stager: { type: "integrated", host: null },
                config: "build web",
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "4",
            {
              id: "4",
              plan: {
                stager: { type: "integrated", host: null },
                config: "build web",
                tool: dockerTool,
              },
              state: "running",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "5",
            {
              id: "5",
              plan: {
                stager: { type: "integrated", host: null },
                config: "push",
                tool: dockerTool,
              },
              state: "succeed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([
          ["1", List(["1"])],
          ["2", List(["2"])],
          ["3", List(["3", "4"])],
          ["4", List(["5"])],
        ]),
        byToolID: Map([["1", List(["1", "2", "3", "4", "5"])]]),
      });
      let subject = selectTaskIDOfRunningPlan(state, {
        stager: { type: "integrated", host: null },
        config: "build web",
        tool: dockerTool,
        id: "3",
      });

      expect(subject).toBe("4");
    });

    it("should return null if no task is running for plan", () => {
      let state: TasksReducer = new TasksReducerRecord({
        byTaskID: Map([
          [
            "1",
            {
              id: "1",
              plan: {
                stager: { type: "integrated", host: null },
                config: "run web",
                tool: dockerTool,
              },
              state: "running",
              debut: 1475954335,
              end: 1475954337,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "2",
            {
              id: "2",
              plan: {
                stager: { type: "integrated", host: null },
                config: "run db",
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "3",
            {
              id: "3",
              plan: {
                stager: { type: "integrated", host: null },
                config: "build web",
                tool: dockerTool,
              },
              state: "crashed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "4",
            {
              id: "4",
              plan: {
                stager: { type: "integrated", host: null },
                config: "build web",
                tool: dockerTool,
              },
              state: "failed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
          [
            "5",
            {
              id: "5",
              plan: {
                stager: { type: "integrated", host: null },
                config: "push",
                tool: dockerTool,
              },
              state: "succeed",
              debut: 1475954335,
              end: 1475954335,
              strategy: integratedStrategy,
              step: 1,
            },
          ],
        ]),
        byPlanID: Map([
          ["1", List(["1"])],
          ["2", List(["2"])],
          ["3", List(["3", "4"])],
          ["4", List(["5"])],
        ]),
        byToolID: Map([["1", List(["1", "2", "3", "4", "5"])]]),
      });
      let subject = selectTaskIDOfRunningPlan(state, {
        stager: { type: "integrated", host: null },
        config: "build web",
        tool: dockerTool,
        id: "3",
      });

      expect(subject).toBe(null);
    });
  });
});
