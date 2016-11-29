import React from 'react';
import { shallow, mount } from 'enzyme';
import TargetsWithTasks from './TargetsWithTasks';
import type {Task as TaskType, TaskState} from '../Types/types.js.flow'
import type {TargetConfig} from '../../TargetConfigurationFeature/Types/types.js.flow';
import {StyleRoot} from 'radium';
import TargetWithTasks from "./TargetWithTasks";

describe('TargetsWithTasks', () => {

  let gulpBuildTarget: TargetConfig & {state: TaskState} = {
    name: 'build',
    stager: {
      type: 'integrated'
    },
    config: {

    },
    state: 'crashed',
    tool: {
      id: '1',
      name: 'gulp',
      iconUri: 'atom://molecule/gulp.png',
    }
  };
  let gulpBuildTasks: Array<TaskType> = [{
    id: '1',
    target: gulpBuildTarget,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'crashed',
    debut: 1480425542,
    end: 1480425544,
  }, {
    id: '1',
    target: gulpBuildTarget,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'running',
    debut: 1480425542,
  }, {
    id: '1',
    target: gulpBuildTarget,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'stopped',
    debut: 1480425542,
    end: 1480425544,
  }, {
    id: '1',
    target: gulpBuildTarget,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'crashed',
    debut: 1480425542,
    end: 1480425544,
  }, {
    id: '1',
    target: gulpBuildTarget,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'crashed',
    debut: 1480425542,
    end: 1480425544,
  }, {
    id: '1',
    target: gulpBuildTarget,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'running',
    debut: 1480425542,
  }];

  let gulpWatchTarget: TargetConfig & {state: TaskState} = {
    name: 'watch',
    stager: {
      type: 'integrated'
    },
    config: {

    },
    state: 'crashed',
    tool: {
      id: '1',
      name: 'gulp',
      iconUri: 'atom://molecule/gulp.png',
    }
  };
  let gulpWatchTasks: Array<TaskType> = [{
    id: '1',
    target: gulpWatchTarget,
    strategy: {
      type: 'shell',
      command: 'gulp watch'
    },
    state: 'crashed',
    debut: 1480425542,
    end: 1480425544,
  }, {
    id: '1',
    target: gulpWatchTarget,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'running',
    debut: 1480425542,
  }, {
    id: '1',
    target: gulpWatchTarget,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'stopped',
    debut: 1480425542,
    end: 1480425544,
  }, {
    id: '1',
    target: gulpWatchTarget,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'crashed',
    debut: 1480425542,
    end: 1480425544,
  }, {
    id: '1',
    target: gulpWatchTarget,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'crashed',
    debut: 1480425542,
    end: 1480425544,
  }, {
    id: '1',
    target: gulpWatchTarget,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'running',
    debut: 1480425542,
  }];

  let gulpServeTarget: TargetConfig & {state: TaskState} = {
    name: 'serve',
    stager: {
      type: 'integrated'
    },
    config: {

    },
    state: 'crashed',
    tool: {
      id: '1',
      name: 'gulp',
      iconUri: 'atom://molecule/gulp.png',
    }
  };
  let gulpServeTasks: Array<TaskType> = [{
    id: '1',
    target: gulpServeTarget,
    strategy: {
      type: 'shell',
      command: 'gulp serve'
    },
    state: 'crashed',
    debut: 1480425542,
    end: 1480425544,
  }, {
    id: '1',
    target: gulpServeTarget,
    strategy: {
      type: 'shell',
      command: 'gulp serve'
    },
    state: 'running',
    debut: 1480425542,
  }, {
    id: '1',
    target: gulpServeTarget,
    strategy: {
      type: 'shell',
      command: 'gulp serve'
    },
    state: 'stopped',
    debut: 1480425542,
    end: 1480425544,
  }, {
    id: '1',
    target: gulpServeTarget,
    strategy: {
      type: 'shell',
      command: 'gulp serve'
    },
    state: 'crashed',
    debut: 1480425542,
    end: 1480425544,
  }, {
    id: '1',
    target: gulpServeTarget,
    strategy: {
      type: 'shell',
      command: 'gulp serve'
    },
    state: 'crashed',
    debut: 1480425542,
    end: 1480425544,
  }, {
    id: '1',
    target: gulpServeTarget,
    strategy: {
      type: 'shell',
      command: 'gulp serve'
    },
    state: 'running',
    debut: 1480425542,
  }];

  let targetsWithTasks = [{
    target: gulpBuildTarget,
    tasks: gulpBuildTasks,
  }, {
    target: gulpWatchTarget,
    tasks: gulpWatchTasks,
  }, {
    target: gulpServeTarget,
    tasks: gulpServeTasks,
  }];

  it('should display many TargetWithTasks', () => {
    let subject = mount(
      <StyleRoot>
        <TargetsWithTasks targetsWithTasks={targetsWithTasks}/>
      </StyleRoot>
    );

    expect(subject.find(TargetWithTasks).length).toBe(3);
  });

  it('should call onTargetClick on target click', () => {
    let spy = jest.fn();
    let subject = mount(
      <StyleRoot>
        <TargetsWithTasks targetsWithTasks={targetsWithTasks} onTargetClick={spy}/>
      </StyleRoot>
    );

    subject.find(TargetWithTasks).at(1).prop('onTargetClick')(targetsWithTasks[1].target);

    expect(spy).toBeCalledWith(targetsWithTasks[1].target);
  });

  it('should call onTaskClick on task click', () => {
    let spy = jest.fn();
    let subject = mount(
      <StyleRoot>
        <TargetsWithTasks targetsWithTasks={targetsWithTasks} onTaskClick={spy}/>
      </StyleRoot>
    );

    subject.find(TargetWithTasks).at(1).prop('onTaskClick')(targetsWithTasks[1].tasks[1]);

    expect(spy).toBeCalledWith(targetsWithTasks[1].tasks[1]);
  });
});
