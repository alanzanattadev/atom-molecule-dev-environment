'use babel'
// @flow

import React from 'react';
import Target from "../../TargetConfigurationFeature/Presenters/Target";
import Tasks from "./Tasks";
import type {TargetConfig} from "../../TargetConfigurationFeature/Types/types.js.flow";
import type {Task, TaskState} from "../Types/types.js.flow";

export default class TargetWithTasks extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      hovered: false
    };
  }

  render() {
    return (
      <div style={{position: 'relative', overflow: 'visible'}} onMouseEnter={() => this.setState({hovered: true})} onMouseLeave={() => this.setState({hovered: false})}>
        <Target name={this.props.target.name} iconUri={this.props.target.tool.iconUri} state={this.props.target.state} onClick={() => this.props.onTargetClick(this.props.target)}/>
        <div style={{position: 'absolute', top: 50, left: 0, visibility: this.state.hovered ? 'visible' : 'hidden'}}>
          <Tasks tasks={this.props.tasks} onTaskClick={task => this.props.onTaskClick(task)} limited/>
        </div>
      </div>
    )
  }
}

TargetWithTasks.propTypes = {

};

TargetWithTasks.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  target: TargetConfig & {state: TaskState},
  tasks: Array<Task>,
  onTargetClick(target: TargetConfig): void,
  onTaskClick(task: Task): void,
};

type State = {
  hovered: boolean
};
