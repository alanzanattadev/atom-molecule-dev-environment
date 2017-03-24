'use babel';
// @flow
import React from 'react';
import moment from 'moment';
import path from 'path';
import Radium from 'radium';

export class FlowDiagnosticCollapse
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    console.log(this.props.data);
    return (
      <div>
        {this.props.collapsed
          ? <div onClick={this.props.click}>
              {'▶'}
              &nbsp;&nbsp;
              <span style={{ fontSize: '14px' }}>
                {this.props.data}
              </span>
            </div>
          : <div onClick={this.props.click}>
              {'▼'}
            </div>}
      </div>
    );
  }
}

FlowDiagnosticCollapse.propTypes = {};

FlowDiagnosticCollapse.defaultProps = {};

type DefaultProps = {};

type Props = {
  collapsed: boolean,
  data: string,
  click: void,
};

type State = {};

export default Radium(FlowDiagnosticCollapse);
