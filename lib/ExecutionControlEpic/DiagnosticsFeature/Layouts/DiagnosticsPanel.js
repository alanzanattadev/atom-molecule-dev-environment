'use babel'
// @flow

import React from 'react';
import ToolDiagnosticsTraveller from "../Containers/ToolDiagnosticsTraveller";

export default class DiagnosticsPanel extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{flex: 1, display: 'flex', alignItems: 'stretch', flexDirection: 'column'}} key={this.props.toolId}>
        <ToolDiagnosticsTraveller {...this.props}/>
      </div>
    )
  }
}

DiagnosticsPanel.propTypes = {

};

DiagnosticsPanel.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  toolId: string,
  toolName: string,
  onClose(): void,
};

type State = {

};
