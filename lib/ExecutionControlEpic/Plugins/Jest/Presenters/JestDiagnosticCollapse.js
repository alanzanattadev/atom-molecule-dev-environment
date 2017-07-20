"use babel";
// @flow

import React from "react";
import Radium from "radium";
import Styled from "styled-components";

const DiagnosticMessage = Styled.div`
  white-space: pre-wrap;
  padding: 16px;
  margin-bottom: 8px;
`;

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
    let data = this.props.data.split("\n");
    data.splice(0, 2);
    return { __html: data.join("\n") };
  }

  render() {
    return (
      <span onMouseEnter={() => this.enter()} onMouseLeave={() => this.leave()}>
        {this.props.collapsed
          ? <span onClick={this.props.click}>
              &nbsp;&nbsp;▼ Expand
            </span>
          : <span onClick={this.props.click}>
              &nbsp;&nbsp;▼ Collapse
            </span>}
        {this.props.collapsed === false
          ? <DiagnosticMessage dangerouslySetInnerHTML={this.content()} />
          : false}
      </span>
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
