'use babel'
// @flow

import type {TasksReducer} from "../Reducers/Tasks";
import {selectStateOfTarget, selectStateOfTool} from './Tasks';

describe('Tasks Selectors', () => {
  let dockerTool = {iconUri: "", name: "docker", id: "1"};
  let gulpTool = {iconUri: "", name: "gulp", id: "2"};
  let buildTarget = "build";
  let runTarget = "run";
  describe('selectStateOfTarget', () => {
    it('should return running when one of tasks is running', () => {
      let state: TasksReducer = [
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "created", debut: 1475954335},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954335, end: 1475954335},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "running", debut: 1475954335},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "succeed", debut: 1475954335, end: 1475954335},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335},
      ];
      let subject = selectStateOfTarget(state, {config: buildTarget, tool: dockerTool});

      expect(subject).toBe("running");
    });

    it('should return crashed when no task is running and the last one has crashed', () => {
      let state: TasksReducer = [
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954335, end: 1475954335},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954336},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335},
        {id: "1", target: {config: runTarget, tool: dockerTool}, state: "failed", debut: 1475954335, end: 1475954337},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "stopped", debut: 1475954335, end: 1475954335},
      ];
      let subject = selectStateOfTarget(state, {config: buildTarget, tool: dockerTool});

      expect(subject).toBe("crashed");
    });

    it('should return succeed when no task is running and the last one has succeed', () => {
      let state: TasksReducer = [
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "succeed", debut: 1475954335, end: 1475954336},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "succeed", debut: 1475954335, end: 1475954335},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954335, end: 1475954335},
      ];
      let subject = selectStateOfTarget(state, {config: buildTarget, tool: dockerTool});

      expect(subject).toBe("succeed");
    });

    it('should return failed when no task is running and the last one has failed', () => {
      let state: TasksReducer = [
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954335, end: 1475954336},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "stopped", debut: 1475954335, end: 1475954335},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "succeed", debut: 1475954335, end: 1475954335},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335},
      ];
      let subject = selectStateOfTarget(state, {config: buildTarget, tool: dockerTool});

      expect(subject).toBe("failed");
    });

    it('should return stopped when no task is running and the last one has been stopped', () => {
      let state: TasksReducer = [
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "stopped", debut: 1475954335, end: 1475954337},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954335, end: 1475954335},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "succeed", debut: 1475954335, end: 1475954335},
      ];
      let subject = selectStateOfTarget(state, {config: buildTarget, tool: dockerTool});

      expect(subject).toBe("stopped");
    });

    it('should return created when no task is running', () => {
      let state: TasksReducer = [
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "created", debut: 1475954335},
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "created", debut: 1475954335},
      ];
      let subject = selectStateOfTarget(state, {config: buildTarget, tool: dockerTool});

      expect(subject).toBe("created");
    });

    it('should return null when no task is existing for target', () => {
      let state: TasksReducer = [];
      let subject = selectStateOfTarget(state, {config: buildTarget, tool: dockerTool});

      expect(subject).toBe(null);
    });
  });

  describe('selectStateOfTool', () => {
    it('should return running when one of tool\'s target is running', () => {
      let state: TasksReducer = [
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "running", debut: 1475954335},
        {id: "2", target: {config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954336, end: 1475954337},
        {id: "3", target: {config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954337, end: 1475954338},
        {id: "4", target: {config: buildTarget, tool: dockerTool}, state: "created", debut: 1475954333},
      ];
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("running");
    });

    it('should return stopped when no tool\'s target is running and the last one has been stopped', () => {
      let state: TasksReducer = [
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954334, end: 1475954335},
        {id: "2", target: {config: buildTarget, tool: dockerTool}, state: "stopped", debut: 1475954334, end: 1475954336},
        {id: "3", target: {config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954334, end: 1475954335},
        {id: "4", target: {config: buildTarget, tool: dockerTool}, state: "succeed", debut: 1475954334, end: 1475954335},
        {id: "5", target: {config: buildTarget, tool: dockerTool}, state: "created", debut: 1475954334},
        {id: "6", target: {config: buildTarget, tool: gulpTool}, state: "crashed", debut: 1475954334, end: 1475954339},
      ];
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("stopped");
    });

    it('should return crashed when no tool\'s target is running and the last one has crashed', () => {
      let state: TasksReducer = [
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "stopped", debut: 1475954334, end: 1475954334},
        {id: "2", target: {config: runTarget, tool: dockerTool}, state: "crashed", debut: 1475954334, end: 1475954333},
        {id: "3", target: {config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954334, end: 1475954339},
        {id: "4", target: {config: runTarget, tool: dockerTool}, state: "failed", debut: 1475954334, end: 1475954338},
        {id: "5", target: {config: buildTarget, tool: gulpTool}, state: "failed", debut: 1475954334, end: 1475954340},
        {id: "6", target: {config: runTarget, tool: gulpTool}, state: "succeed", debut: 1475954334, end: 1475954338},
      ];
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("crashed");
    });

    it('should return succeed when no tool\'s target is running and the last one has succeed', () => {
      let state: TasksReducer = [
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "stopped", debut: 1475954335 ,end: 1475954335},
        {id: "2", target: {config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335 ,end: 1475954335},
        {id: "3", target: {config: buildTarget, tool: dockerTool}, state: "succeed", debut: 1475954335 ,end: 1475954336},
        {id: "4", target: {config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954335 ,end: 1475954335},
        {id: "5", target: {config: buildTarget, tool: gulpTool}, state: "failed", debut: 1475954335 ,end: 1475954339},
      ];
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("succeed");
    });

    it('should return failed when no tool\'s target is running and the last one has failed', () => {
      let state: TasksReducer = [
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "succeed", debut: 1475954335, end: 1475954335},
        {id: "2", target: {config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954335, end: 1475954336},
        {id: "3", target: {config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335},
        {id: "4", target: {config: buildTarget, tool: dockerTool}, state: "stopped", debut: 1475954335, end: 1475954335},
        {id: "5", target: {config: buildTarget, tool: gulpTool}, state: "succeed", debut: 1475954335, end: 1475954339},
      ];
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("failed");
    });

    it('should return created when no tool\'s target is running', () => {
      let state: TasksReducer = [
        {id: "1", target: {config: buildTarget, tool: dockerTool}, state: "created", debut: 1475954335},
        {id: "2", target: {config: buildTarget, tool: dockerTool}, state: "created", debut: 1475954335},
        {id: "3", target: {config: buildTarget, tool: dockerTool}, state: "created", debut: 1475954335},
        {id: "4", target: {config: buildTarget, tool: gulpTool}, state: "running", debut: 1475954335},
      ];
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("created");
    });

    it('should return null when no tool\'s target exists for tool', () => {
      let state: TasksReducer = [
        {id: "1", target: {config: buildTarget, tool: gulpTool}, state: "running", debut: 1475954335},
        {id: "2", target: {config: runTarget, tool: gulpTool}, state: "crashed", debut: 1475954335, end: 1475954336},
      ];
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe(null);
    });

    it('should return null when no tool\'s target exists', () => {
      let state: TasksReducer = [];
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe(null);
    });
  });
});
