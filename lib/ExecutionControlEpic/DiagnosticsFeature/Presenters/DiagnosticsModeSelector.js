"use babel";
// @flow

import styled from "styled-components";
import React from "react";
import DiagnosticMode from "./DiagnosticMode";

const DiagnosticsModeSelectorBox = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 10;
  flex-shrink: 0;
`;

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
      <DiagnosticsModeSelectorBox>
        <DiagnosticMode
          iconUri="three-bars"
          name="Logs"
          active={this.props.type === "logs"}
          onClick={() => this.props.onClick("logs")}
        />
        <DiagnosticMode
          iconUri="list-ordered"
          name="Organized"
          active={this.props.type === "organized"}
          onClick={() => this.props.onClick("organized")}
        />
        <DiagnosticMode
          iconUri="terminal"
          name="Terminal"
          active={this.props.type === "terminal"}
          onClick={() => this.props.onClick("terminal")}
        />
      </DiagnosticsModeSelectorBox>
    );
  }
}

DiagnosticsModeSelector.defaultProps = {};

type DefaultProps = {};

type Props = {
  onClick(event: any): void,
  type: "organized" | "logs" | "terminal",
};

type State = {};
