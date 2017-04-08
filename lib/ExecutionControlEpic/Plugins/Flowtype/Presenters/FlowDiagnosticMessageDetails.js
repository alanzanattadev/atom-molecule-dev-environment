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
      <span
        style={{
          color: "#fff",
          fontSize: "16px",
          marginLeft: "3em",
        }}
      >
        {this.props.descr ? this.props.descr : false}
        {this.props.comment ? `. ${this.props.comment}` : false}
      </span>
    );
  }
}

FlowDiagnosticMessageDetails.defaultProps = {};

type DefaultProps = {};

type Props = {
  descr: string,
  comment: string,
};

type State = {};

export default Radium(FlowDiagnosticMessageDetails);
