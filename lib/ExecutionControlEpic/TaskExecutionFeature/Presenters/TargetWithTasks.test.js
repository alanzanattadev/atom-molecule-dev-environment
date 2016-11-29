'use babel'
// @flow

import React from 'react';
import { shallow, mount } from 'enzyme';
import TargetWithTasks from './TargetWithTasks';
import {StyleRoot} from 'radium';
import Task from './Task';
import Target from '../../TargetConfigurationFeature/Presenters/Target';
import type {TargetConfig} from '../../TargetConfigurationFeature/Types/types.js.flow';
import type {Task as TaskType, TaskState} from '../Types/types.js.flow';

describe('TargetWithTasks', () => {
  let target: TargetConfig & {state: TaskState} = {
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
  let tasks: Array<TaskType> = [{
    id: '1',
    target: target,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'crashed',
    debut: 1480425542,
    end: 1480425544,
  }, {
    id: '1',
    target: target,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'running',
    debut: 1480425542,
  }, {
    id: '1',
    target: target,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'stopped',
    debut: 1480425542,
    end: 1480425544,
  }, {
    id: '1',
    target: target,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'crashed',
    debut: 1480425542,
    end: 1480425544,
  }, {
    id: '1',
    target: target,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'crashed',
    debut: 1480425542,
    end: 1480425544,
  }, {
    id: '1',
    target: target,
    strategy: {
      type: 'shell',
      command: 'gulp build'
    },
    state: 'running',
    debut: 1480425542,
  }];

  it('it should display a target', () => {
    let subject = mount(
      <StyleRoot>
        <TargetWithTasks target={target} tasks={tasks}/>
      </StyleRoot>
    );

    expect(subject.find(Target).length).toBe(1);
    expect(subject.find(Target).at(0).prop('state')).toBe(target.state);
    expect(subject.find(Target).at(0).prop('iconUri')).toBe(target.tool.iconUri);
    expect(subject.find(Target).at(0).prop('name')).toBe(target.name);
    expect(subject.find(Target).at(0).prop('onClick')).toBeDefined();
  });

  it('should display tasks on hover', () => {
    let subject = mount(
      <StyleRoot>
        <TargetWithTasks target={target} tasks={tasks}/>
      </StyleRoot>
    );

    subject.simulate('mouseenter');

    expect(subject.find(Task).length).toBe(5);

    // subject.simulate('mouseleave');
    //
    // expect(subject.find(Task).length).toBe(0)
  });

  it('should call onTaskClick on Task click', () => {
    let spy = jest.fn();
    let subject = mount(
      <StyleRoot>
        <TargetWithTasks target={target} tasks={tasks} onTaskClick={spy}/>
      </StyleRoot>
    );

    subject.simulate('mouseenter');
    subject.find(Task).at(0).simulate('click', {});

    expect(spy).toBeCalledWith(tasks[0]);
  });

  it('should call onTargetClick on Target click', () => {
    let spy = jest.fn();
    let subject = mount(
      <StyleRoot>
        <TargetWithTasks target={target} tasks={tasks} onTargetClick={spy}/>
      </StyleRoot>
    );


    subject.find(Target).at(0).prop('onClick')();

    expect(spy).toBeCalledWith(target);
  });
});
