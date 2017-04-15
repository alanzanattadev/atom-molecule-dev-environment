"use babel";
// @flow

import React from "react";
import Radium from "radium";

export class FlowDiagnosticCollapse
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
    this.state = {
      hovered: false,
    };
  }

  enter() {
    this.setState({ hovered: true });
  }

  leave() {
    this.setState({ hovered: false });
  }

  render() {
    return (
      <div
        onMouseEnter={() => this.enter()}
        onMouseLeave={() => this.leave()}
        style={{
          color: this.state.hovered ? "#fff" : false,
        }}
      >
        {this.props.collapsed
          ? <div onClick={this.props.click}>
              {"▶"}
              &nbsp;&nbsp;
              <span style={{ fontSize: "14px" }}>
                {this.props.data}
              </span>
            </div>
          : <div onClick={this.props.click}>
              {"▼"}
              &nbsp;&nbsp;


              {this.state.hovered
                ? <span style={{ fontSize: "10px" }}>COLLAPSE</span>
                : false}
            </div>}
      </div>
    );
  }
}

FlowDiagnosticCollapse.defaultProps = {};

type DefaultProps = {};

type Props = {
  collapsed: boolean,
  data: string,
  click: void,
};

type State = {
  hovered: boolean,
};

export default Radium(FlowDiagnosticCollapse);
