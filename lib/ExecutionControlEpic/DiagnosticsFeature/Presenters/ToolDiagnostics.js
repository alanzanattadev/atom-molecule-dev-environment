'use babel'
// @flow

import React from 'react';
import DiagnosticsTraveller from "./DiagnosticsTraveller";
import ToolName from "./ToolName";
import type {Diagnostic} from "../Types/types.js.flow";
import CloseButton from "./CloseButton";
import type {Task} from "../../TaskExecutionFeature/Types/types.js.flow";
import TargetsWithTasks from "../../TaskExecutionFeature/Presenters/TargetsWithTasks";
import type {TargetConfig} from "../../TargetConfigurationFeature/Types/types.js.flow";

export default class ToolDiagnostics extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{position: 'relative', minHeight: '300px', display: 'flex', alignitems: 'stretch', flex: '1'}}>
        <div style={{position: 'absolute', top: '10px', right: '10px', zIndex: '2'}}>
          <CloseButton onClick={this.props.onClose}/>
        </div>
        <div style={{position: 'absolute', left: '100px', zIndex: '2'}}>
          <ToolName>{this.props.toolName}</ToolName>
        </div>
        <div style={{marginTop: '20px', display: 'flex', flexDirection: 'column', alignitems: 'center', flex: '1'}}>
          <TargetsWithTasks onTargetClick={this.props.onTargetClick} onTaskClick={this.props.onTaskClick} targetsWithTasks={this.props.targetsWithTasks}/>
          <DiagnosticsTraveller diagnostics={this.props.diagnostics}/>
        </div>
      </div>
    )
  }
}

ToolDiagnostics.propTypes = {

};

ToolDiagnostics.defaultProps = {
  diagnostics: [],
  targetsWithTasks: [],
};

type DefaultProps = {

};

type Props = {
  diagnostics: Array<Diagnostic>,
  toolName: string,
  onClose(): void,
  onTargetClick(target: TargetConfig): void,
  onTaskClick(task: Task): void,
  targetsWithTasks: Array<{target: TargetConfig, tasks: Array<Task>}>
};

type State = {

};
