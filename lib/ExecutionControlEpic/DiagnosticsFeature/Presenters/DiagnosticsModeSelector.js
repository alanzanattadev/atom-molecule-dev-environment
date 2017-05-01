"use babel";
// @flow

import React from "react";
import OrganizedButton from "./OrganizedButton";
import LogsButton from "./LogsButton";
import TerminalButton from "./TerminalButton";

export default class DiagnosticsModeSelector
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
        }}
      >
        <LogsButton
          selected={this.props.type === "logs"}
          disabled={this.props.type === "logs"}
          onClick={() => this.props.onClick("logs")}
        />
        <OrganizedButton
          selected={this.props.type === "organized"}
          disabled={this.props.type === "organized"}
          onClick={() => this.props.onClick("organized")}
        />
        <TerminalButton
          selected={this.props.type === "terminal"}
          disabled={this.props.type === "terminal"}
          onClick={() => this.props.onClick("terminal")}
        />
      </div>
    );
  }
}

DiagnosticsModeSelector.defaultProps = {};

type DefaultProps = {};

type Props = {
  onClick(): void,
  type: "organized" | "logs",
};

type State = {};
