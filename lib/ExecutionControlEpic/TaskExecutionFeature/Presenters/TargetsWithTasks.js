'use babel'
// @flow

import React from 'react';
import type {TaskState, Task} from "../Types/types.js";
import TargetWithTasks from "./TargetWithTasks";
import type {TargetConfig} from '../../TargetConfigurationFeature/Types/types.js.flow';

export default class TargetsWithTasks extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ul style={{display: 'flex', overflow: 'auto', flexWrap: 'no-wrap', alignItems: 'center', padding: 'none', margin: '5px 10px', overflow: 'visible'}}>
        {this.props.targetsWithTasks.map(targetWithTasks => (
          <li style={{display: 'flex', listStyle: 'none', margin: '5px'}} key={targetWithTasks.target.name + targetWithTasks.target.tool.id}>
            <TargetWithTasks target={targetWithTasks.target} tasks={targetWithTasks.tasks} onTaskClick={task => this.props.onTaskClick(task)} onTargetClick={target => this.props.onTargetClick(target)}/>
          </li>
        ))}
      </ul>
    )
  }
}

TargetsWithTasks.propTypes = {

};

TargetsWithTasks.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  targetsWithTasks: Array<{target: TargetConfig, tasks: Array<Task>}>,
  onTargetClick(target: TargetConfig): void,
  onTaskClick(task: Task): void,
};

type State = {

};
