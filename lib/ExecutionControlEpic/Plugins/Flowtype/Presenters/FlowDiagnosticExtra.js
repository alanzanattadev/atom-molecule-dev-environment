"use babel";
// @flow

import React from "react";
import Radium from "radium";
import FlowDiagnosticExtras from "./FlowDiagnosticExtras";
import FlowDiagnosticMessages from "./FlowDiagnosticMessages";
import FlowDiagnosticCollapse from "./FlowDiagnosticCollapse";
import type { FlowLogExtra, FlowLogMessage } from "../Types/types.flow";

export class FlowDiagnosticExtra extends React.Component<
  DefaultProps,
  Props,
  State,
> {
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

  getFirstVal(arr: Array<FlowLogMessage>): string {
    let first = arr.find(msg => msg);
    return !first.path ? first.descr : `${first.path}:${first.line}`;
  }

  render() {
    return (
      <div style={{ display: "inline-block" }}>
        <FlowDiagnosticCollapse
          click={() => this.toggleCollapse()}
          collapsed={this.state.collapsed}
          data={this.getFirstVal(this.props.message)}
        />
        {this.state.collapsed
          ? false
          : <div>
              <FlowDiagnosticMessages messages={this.props.message} />
              {this.props.children
                ? <FlowDiagnosticExtras extras={this.props.children} />
                : false}
            </div>}
      </div>
    );
  }
}

FlowDiagnosticExtra.defaultProps = {
  message: [{}],
};

type DefaultProps = {
  message: [{}],
};

type Props = {
  message: Array<FlowLogMessage>,
  children?: FlowLogExtra,
};

type State = {
  collapsed: boolean,
};

export default Radium(FlowDiagnosticExtra);
