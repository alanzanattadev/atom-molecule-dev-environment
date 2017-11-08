"use babel";
// @flow

import * as React from "react";

export default class DiagnosticDetails extends React.Component<Props, State> {
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
    } else if (
      typeof this.props.message == "string" &&
      this.props.view !== undefined
    ) {
      const Comp = this.props.view;
      return <Comp />;
    } else if (typeof this.props.message == "string") {
      return (
        <div style={{ maxWidth: "800px", fontSize: "15px" }}>
          {this.props.message}
        </div>
      );
    } else {
      return null;
    }
  }
}

DiagnosticDetails.defaultProps = {};

type DefaultProps = {};

type Props = {
  message: string,
  view?: React$Component,
};

type State = {};
