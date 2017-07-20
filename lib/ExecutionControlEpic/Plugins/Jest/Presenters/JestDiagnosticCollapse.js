"use babel";
// @flow

import React from "react";
import Radium from "radium";

export class JestDiagnosticCollapse
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

  content() {
    const data = this.props.data;

    return { __html: data };
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
              {this.state.hovered ? "Expand" : false}
            </div>
          : <div onClick={this.props.click}>
              {"▼"}
              &nbsp;&nbsp;
              {this.state.hovered ? "Collapse" : false}
              <div
                style={{ whiteSpace: "pre-wrap" }}
                dangerouslySetInnerHTML={this.content()}
                className="inset-panel padded"
              />
            </div>}
      </div>
    );
  }
}

JestDiagnosticCollapse.defaultProps = {};

type DefaultProps = {};

type Props = {
  collapsed: boolean,
  data: string,
  click: void,
};

type State = {
  hovered: boolean,
};

export default Radium(JestDiagnosticCollapse);
