"use babel";
// @flow

import * as React from "react";
import Radium from "radium";
import FlowDiagnosticExtras from "./FlowDiagnosticExtras";
import FlowDiagnosticMessages from "./FlowDiagnosticMessages";
import type { FlowLog } from "../Types/types.flow.js";

export class FlowDiagnostic extends React.Component<Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return <div>{this.props.message}</div>;
  }
}

FlowDiagnostic.defaultProps = {
  message: "",
};

type DefaultProps = {
  message: "",
};

type Props = {
  message: string,
};

type State = {};

export default Radium(FlowDiagnostic);
