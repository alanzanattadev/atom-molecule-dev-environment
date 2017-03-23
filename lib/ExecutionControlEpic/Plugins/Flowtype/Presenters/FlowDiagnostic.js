'use babel';
// @flow
import React from 'react';
import moment from 'moment';
import path from 'path';
import Radium from 'radium';
import FlowDiagnosticExtras from './FlowDiagnosticExtras';
import FlowDiagnosticMessages from './FlowDiagnosticMessages';
import type { FlowLog } from './Types/types.flow.js';

export class FlowDiagnostic
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <FlowDiagnosticMessages messages={this.props.log.message} />
        {this.props.log.extra
          ? <FlowDiagnosticExtras extras={this.props.log.extra} />
          : false}
        {this.props.log.operation
          ? <FlowDiagnosticMessages messages={[this.props.log.operation]} />
          : false}
      </div>
    );
  }
}

FlowDiagnostic.propTypes = {};

FlowDiagnostic.defaultProps = {
  log: {},
};

type DefaultProps = {
  log: {},
};

type Props = {
  log: FlowLog,
};

type State = {};

export default Radium(FlowDiagnostic);
