"use babel";
// @flow

import React from "react";
import { isClassComponent } from "recompose";

export default class DiagnosticDetails
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    if (typeof this.props.message == "object" && this.props.message.html) {
      return (
        <div
          style={{ maxWidth: "800px", fontSize: "15px" }}
          dangerouslySetInnerHTML={{ __html: this.props.message.text }}
        />
      );
    } else if (
      typeof this.props.message == "object" &&
      this.props.message.data
    ) {
      return (
        <div style={{ maxWidth: "800px", fontSize: "15px" }}>
          {JSON.stringify(this.props.message.data, null, 2)}
        </div>
      );
    } else if (typeof this.props.message == "object") {
      return (
        <div style={{ maxWidth: "800px", fontSize: "15px" }}>
          {this.props.message.text}
        </div>
      );
    } else if (typeof this.props.message == "string") {
      return (
        <div style={{ maxWidth: "800px", fontSize: "15px" }}>
          {this.props.message}
        </div>
      );
    } else if (
      typeof this.props.message == "function" ||
      isClassComponent(this.props.message)
    ) {
      const Comp = this.props.message;
      return <Comp />;
    } else {
      return null;
    }
  }
}

DiagnosticDetails.defaultProps = {};

type DefaultProps = {};

type Props = {
  message: string,
};

type State = {};
