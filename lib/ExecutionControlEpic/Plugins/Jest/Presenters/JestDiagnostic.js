"use babel";
// @flow

import React from "react";
import Radium from "radium";
import JestDiagnosticCollapse from "./JestDiagnosticCollapse";
import StripAnsi from "strip-ansi";

export class JestDiagnostic
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    return (
      <div>
        <span
          className={
            this.props.status === "passed" ? "text-success" : "text-danger"
          }
        >
          {this.props.suite.status}
        </span>
        :
        {" "}
        {this.props.suite.name}
        {this.props.suite.message.length !== 0
          ? <JestDiagnosticCollapse
              click={() => this.toggleCollapse()}
              collapsed={this.state.collapsed}
              data={StripAnsi()}
            />
          : ""}
      </div>
    );
  }
}

JestDiagnostic.defaultProps = {};

type DefaultProps = {};

type Props = {
  suite: {
    name: string,
    message: string,
    status: string,
  },
};

type State = {
  collapsed: boolean,
};

export default Radium(JestDiagnostic);
