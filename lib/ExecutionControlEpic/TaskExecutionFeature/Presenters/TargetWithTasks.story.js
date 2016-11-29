import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TargetWithTasks from "./TargetWithTasks";

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
    iconUri: 'devtool-icon-flow.png',
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
  selected: true,
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

storiesOf('TargetWithTasks', module)
  .add('Basic', () => (
    <TargetWithTasks target={target} tasks={tasks}/>
  ))
