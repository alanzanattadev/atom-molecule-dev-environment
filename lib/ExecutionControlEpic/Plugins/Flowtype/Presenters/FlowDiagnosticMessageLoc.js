"use babel";
// @flow

import React from "react";
import Radium from "radium";

export class FlowDiagnosticMessageDetails
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <span>
        <span
          style={{
            color: "#696969",
            fontSize: "14px",
            textDecoration: "underline",
          }}
        >
          {this.props.path}:{this.props.line}
        </span>
        <br />
        <span
          style={{
            color: "#fff",
            fontSize: "16px",
            marginLeft: "1em",
            marginRight: "2em",
          }}
        >
          {this.props.line}:
        </span>
      </span>
    );
  }
}

FlowDiagnosticMessageDetails.defaultProps = {};

type DefaultProps = {};

type Props = {
  path: string,
  line: number,
};

type State = {};

export default Radium(FlowDiagnosticMessageDetails);
