"use babel";
// @flow

import React from "react";
import Radium from "radium";
import JestDiagnosticCollapse from "./JestDiagnosticCollapse";
import StripAnsi from "strip-ansi";
import Styled from "styled-components";

const DiagnosticContent = Styled.div`
  font-size: 12px;
`;

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
      <DiagnosticContent>
        <span
          className={
            this.props.status == "passed" ? "text-success" : "text-danger"
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
              data={StripAnsi(this.props.suite.message)}
            />
          : ""}
      </DiagnosticContent>
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
