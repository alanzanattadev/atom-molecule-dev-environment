'use babel'
// @flow

import React from 'react';
import DiagnosticsTraveller from "./DiagnosticsTraveller";
import ToolName from "./ToolName";
import type {Diagnostic} from "../Types/types.js.flow";
import CloseButton from "./CloseButton";

export default class ToolDiagnostics extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{position: 'relative', minHeight: '300px'}}>
        <div style={{position: 'absolute', top: '10px', right: '10px'}}>
          <CloseButton onClick={this.props.onClose}/>
        </div>
        <div style={{position: 'absolute', left: '100px'}}>
          <ToolName>{this.props.toolName}</ToolName>
        </div>
        <DiagnosticsTraveller diagnostics={this.props.diagnostics}/>
      </div>
    )
  }
}

ToolDiagnostics.propTypes = {

};

ToolDiagnostics.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  diagnostics: Array<Diagnostic>,
  toolName: string,
  onClose(): void,
};

type State = {

};
