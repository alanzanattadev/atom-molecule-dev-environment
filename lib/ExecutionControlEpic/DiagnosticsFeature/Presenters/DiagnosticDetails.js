"use babel";
// @flow

import * as React from "react";
import type { MoleculeDiagnostic } from "../Types/types.js.flow";

export default class DiagnosticDetails extends React.Component<Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    if (
      typeof this.props.diagnostic.message == "object" &&
      this.props.diagnostic.message.html
    ) {
      return (
        <div
          style={{ maxWidth: "800px", fontSize: "15px" }}
          dangerouslySetInnerHTML={{
            __html: this.props.diagnostic.message.text,
          }}
        />
      );
    } else if (
      typeof this.props.diagnostic.message == "object" &&
      this.props.diagnostic.message.data
    ) {
      return (
        <div style={{ maxWidth: "800px", fontSize: "15px" }}>
          {JSON.stringify(this.props.diagnostic.message.data, null, 2)}
        </div>
      );
    } else if (typeof this.props.diagnostic.message == "object") {
      return (
        <div style={{ maxWidth: "800px", fontSize: "15px" }}>
          {this.props.diagnostic.message.text}
        </div>
      );
    } else if (
      typeof this.props.diagnostic.message == "string" &&
      this.props.view !== undefined
    ) {
      const Comp = this.props.view;
      return <Comp {...this.props.diagnostic} />;
    } else if (typeof this.props.diagnostic.message == "string") {
      return (
        <div style={{ maxWidth: "800px", fontSize: "15px" }}>
          {this.props.diagnostic.message}
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
  diagnostic: MoleculeDiagnostic,
  view?: React$Component,
};

type State = {};
