import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TargetsWithTasks from "./TargetsWithTasks";
import { StyleRoot } from 'radium';

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
    iconUri: 'devtool-icon-flow.png',
  }
};
let gulpBuildTasks: Array<TaskType> = [{
  id: '1',
  target: gulpBuildTasks,
  strategy: {
    type: 'shell',
    command: 'gulp build'
  },
  state: 'crashed',
  debut: 1480425542,
  end: 1480425544,
}, {
  id: '1',
  target: gulpBuildTasks,
  strategy: {
    type: 'shell',
    command: 'gulp build'
  },
  state: 'running',
  debut: 1480425542,
}, {
  id: '1',
  target: gulpBuildTasks,
  strategy: {
    type: 'shell',
    command: 'gulp build'
  },
  state: 'stopped',
  debut: 1480425542,
  end: 1480425544,
}, {
  id: '1',
  target: gulpBuildTasks,
  strategy: {
    type: 'shell',
    command: 'gulp build'
  },
  state: 'crashed',
  debut: 1480425542,
  end: 1480425544,
}, {
  id: '1',
  target: gulpBuildTasks,
  strategy: {
    type: 'shell',
    command: 'gulp build'
  },
  state: 'crashed',
  debut: 1480425542,
  end: 1480425544,
}, {
  id: '1',
  target: gulpBuildTasks,
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
    iconUri: 'devtool-icon-docker.png',
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

storiesOf('TargetsWithTasks', module)
  .add('Basic', () => (
    <StyleRoot>
      <TargetsWithTasks targetsWithTasks={targetsWithTasks}/>
    </StyleRoot>
  ))
