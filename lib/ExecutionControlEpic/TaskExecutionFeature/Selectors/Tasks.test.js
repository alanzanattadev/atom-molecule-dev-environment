'use babel'
// @flow

import type {TasksReducer} from "../Reducers/Tasks";
import {selectStateOfTarget, selectStateOfTool, selectTaskIDOfRunningTarget} from './Tasks';

describe('Tasks Selectors', () => {
  let dockerTool = {iconUri: "", name: "docker", id: "1"};
  let gulpTool = {iconUri: "", name: "gulp", id: "2"};
  let buildTarget = "build";
  let runTarget = "run";
  let integratedStrategy = {type: "shell", command: ""};
  describe('selectStateOfTarget', () => {
    it('should return running when one of tasks is running', () => {
      let state: TasksReducer = [
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "created", debut: 1475954335, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "running", debut: 1475954335, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "succeed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
      ];
      let subject = selectStateOfTarget(state, {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool});

      expect(subject).toBe("running");
    });

    it('should return crashed when no task is running and the last one has crashed', () => {
      let state: TasksReducer = [
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954336, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: runTarget, tool: dockerTool}, state: "failed", debut: 1475954335, end: 1475954337, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "stopped", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
      ];
      let subject = selectStateOfTarget(state, {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool});

      expect(subject).toBe("crashed");
    });

    it('should return succeed when no task is running and the last one has succeed', () => {
      let state: TasksReducer = [
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "succeed", debut: 1475954335, end: 1475954336, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "succeed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
      ];
      let subject = selectStateOfTarget(state, {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool});

      expect(subject).toBe("succeed");
    });

    it('should return failed when no task is running and the last one has failed', () => {
      let state: TasksReducer = [
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954335, end: 1475954336, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "stopped", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "succeed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
      ];
      let subject = selectStateOfTarget(state, {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool});

      expect(subject).toBe("failed");
    });

    it('should return stopped when no task is running and the last one has been stopped', () => {
      let state: TasksReducer = [
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "stopped", debut: 1475954335, end: 1475954337, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "succeed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
      ];
      let subject = selectStateOfTarget(state, {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool});

      expect(subject).toBe("stopped");
    });

    it('should return created when no task is running', () => {
      let state: TasksReducer = [
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "created", debut: 1475954335, strategy: integratedStrategy},
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "created", debut: 1475954335, strategy: integratedStrategy},
      ];
      let subject = selectStateOfTarget(state, {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool});

      expect(subject).toBe("created");
    });

    it('should return null when no task is existing for target', () => {
      let state: TasksReducer = [];
      let subject = selectStateOfTarget(state, {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool});

      expect(subject).toBe(null);
    });
  });

  describe('selectStateOfTool', () => {
    it('should return running when one of tool\'s target is running', () => {
      let state: TasksReducer = [
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "running", debut: 1475954335, strategy: integratedStrategy},
        {id: "2", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954336, end: 1475954337, strategy: integratedStrategy},
        {id: "3", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954337, end: 1475954338, strategy: integratedStrategy},
        {id: "4", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "created", debut: 1475954333, strategy: integratedStrategy},
      ];
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("running");
    });

    it('should return stopped when no tool\'s target is running and the last one has been stopped', () => {
      let state: TasksReducer = [
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954334, end: 1475954335, strategy: integratedStrategy},
        {id: "2", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "stopped", debut: 1475954334, end: 1475954336, strategy: integratedStrategy},
        {id: "3", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954334, end: 1475954335, strategy: integratedStrategy},
        {id: "4", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "succeed", debut: 1475954334, end: 1475954335, strategy: integratedStrategy},
        {id: "5", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "created", debut: 1475954334, strategy: integratedStrategy},
        {id: "6", target: {stager: {type: 'integrated'}, config: buildTarget, tool: gulpTool}, state: "crashed", debut: 1475954334, end: 1475954339, strategy: integratedStrategy},
      ];
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("stopped");
    });

    it('should return crashed when no tool\'s target is running and the last one has crashed', () => {
      let state: TasksReducer = [
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "stopped", debut: 1475954334, end: 1475954334, strategy: integratedStrategy},
        {id: "2", target: {stager: {type: 'integrated'}, config: runTarget, tool: dockerTool}, state: "crashed", debut: 1475954334, end: 1475954333, strategy: integratedStrategy},
        {id: "3", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954334, end: 1475954339, strategy: integratedStrategy},
        {id: "4", target: {stager: {type: 'integrated'}, config: runTarget, tool: dockerTool}, state: "failed", debut: 1475954334, end: 1475954338, strategy: integratedStrategy},
        {id: "5", target: {stager: {type: 'integrated'}, config: buildTarget, tool: gulpTool}, state: "failed", debut: 1475954334, end: 1475954340, strategy: integratedStrategy},
        {id: "6", target: {stager: {type: 'integrated'}, config: runTarget, tool: gulpTool}, state: "succeed", debut: 1475954334, end: 1475954338, strategy: integratedStrategy},
      ];
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("crashed");
    });

    it('should return succeed when no tool\'s target is running and the last one has succeed', () => {
      let state: TasksReducer = [
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "stopped", debut: 1475954335 ,end: 1475954335, strategy: integratedStrategy},
        {id: "2", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335 ,end: 1475954335, strategy: integratedStrategy},
        {id: "3", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "succeed", debut: 1475954335 ,end: 1475954336, strategy: integratedStrategy},
        {id: "4", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954335 ,end: 1475954335, strategy: integratedStrategy},
        {id: "5", target: {stager: {type: 'integrated'}, config: buildTarget, tool: gulpTool}, state: "failed", debut: 1475954335 ,end: 1475954339, strategy: integratedStrategy},
      ];
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("succeed");
    });

    it('should return failed when no tool\'s target is running and the last one has failed', () => {
      let state: TasksReducer = [
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "succeed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "2", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "failed", debut: 1475954335, end: 1475954336, strategy: integratedStrategy},
        {id: "3", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "4", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "stopped", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "5", target: {stager: {type: 'integrated'}, config: buildTarget, tool: gulpTool}, state: "succeed", debut: 1475954335, end: 1475954339, strategy: integratedStrategy},
      ];
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("failed");
    });

    it('should return created when no tool\'s target is running', () => {
      let state: TasksReducer = [
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "created", debut: 1475954335, strategy: integratedStrategy},
        {id: "2", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "created", debut: 1475954335, strategy: integratedStrategy},
        {id: "3", target: {stager: {type: 'integrated'}, config: buildTarget, tool: dockerTool}, state: "created", debut: 1475954335, strategy: integratedStrategy},
        {id: "4", target: {stager: {type: 'integrated'}, config: buildTarget, tool: gulpTool}, state: "running", debut: 1475954335, strategy: integratedStrategy},
      ];
      let subject = selectStateOfTool(state, "1");

      expect(subject).toBe("created");
    });

    it('should return null when no tool\'s target exists for tool', () => {
      let state: TasksReducer = [
        {id: "1", target: {stager: {type: 'integrated'}, config: buildTarget, tool: gulpTool}, state: "running", debut: 1475954335, strategy: integratedStrategy},
        {id: "2", target: {stager: {type: 'integrated'}, config: runTarget, tool: gulpTool}, state: "crashed", debut: 1475954335, end: 1475954336, strategy: integratedStrategy},
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

  describe('selectTaskIDOfRunningTarget', () => {
    it('should return the taskID of running target', () => {
      let state: TasksReducer = [
        {id: "1", target: {stager: {type: 'integrated'}, config: "run web", tool: dockerTool}, state: "running", debut: 1475954335, end: 1475954337, strategy: integratedStrategy},
        {id: "2", target: {stager: {type: 'integrated'}, config: "run db", tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "3", target: {stager: {type: 'integrated'}, config: "build web", tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "4", target: {stager: {type: 'integrated'}, config: "build web", tool: dockerTool}, state: "running", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "5", target: {stager: {type: 'integrated'}, config: "push", tool: dockerTool}, state: "succeed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
      ];
      let subject = selectTaskIDOfRunningTarget(state, {stager: {type: 'integrated'}, config: "build web", tool: dockerTool, state: "running"});

      expect(subject).toBe('4');
    });

    it('should return null if no task is running for target', () => {
      let state: TasksReducer = [
        {id: "1", target: {stager: {type: 'integrated'}, config: "run web", tool: dockerTool}, state: "running", debut: 1475954335, end: 1475954337, strategy: integratedStrategy},
        {id: "2", target: {stager: {type: 'integrated'}, config: "run db", tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "3", target: {stager: {type: 'integrated'}, config: "build web", tool: dockerTool}, state: "crashed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "4", target: {stager: {type: 'integrated'}, config: "build web", tool: dockerTool}, state: "failed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
        {id: "5", target: {stager: {type: 'integrated'}, config: "push", tool: dockerTool}, state: "succeed", debut: 1475954335, end: 1475954335, strategy: integratedStrategy},
      ];
      let subject = selectTaskIDOfRunningTarget(state, {stager: {type: 'integrated'}, config: "build web", tool: dockerTool, state: "running"});

      expect(subject).toBe(null);
    });
  });
});
