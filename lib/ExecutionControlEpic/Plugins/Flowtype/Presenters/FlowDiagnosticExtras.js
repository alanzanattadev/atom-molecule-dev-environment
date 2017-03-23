'use babel';
// @flow
import React from 'react';
import moment from 'moment';
import path from 'path';
import Radium from 'radium';
import FlowDiagnosticMessages from './FlowDiagnosticMessages';
import FlowDiagnosticExtra from './FlowDiagnosticExtra';
import type { FlowLogMessages, FlowLogExtra } from '../Types/types.flow';

export class FlowDiagnosticExtras
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
        <ul
          style={{
            listStyle: 'none',
          }}
        >
          {this.props.extras.map((extra, dx) => {
            return (
              <li
                key={dx}
                style={{
                  paddingLeft: '5px',
                }}
              >
                <FlowDiagnosticExtra
                  message={extra.message}
                  children={extra.children ? extra.children : null}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

FlowDiagnosticExtras.propTypes = {};

FlowDiagnosticExtras.defaultProps = {
  extras: [{}],
};

type DefaultProps = {
  extras: [{}],
};

type Props = {
  extras: Array<FlowLogExtra>,
};

type State = {};

export default Radium(FlowDiagnosticExtras);
