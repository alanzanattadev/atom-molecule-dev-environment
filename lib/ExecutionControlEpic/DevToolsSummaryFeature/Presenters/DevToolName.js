"use babel";
// @flow

import * as React from "react";

export default class DevToolName extends React.Component<Props, State> {
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
          padding: "3px 5px",
          display: "inline-flex",
          borderRadius: "4px",
          alignItems: "center",
          cursor: this.props.onClick && "pointer",
        }}
        onClick={this.props.onClick}
      >
        <span className="text-color-highlight" style={{ fontSize: "14px" }}>
          {this.props.children}
        </span>
      </div>
    );
  }
}

DevToolName.defaultProps = {};

type DefaultProps = {};

type Props = {
  onClick(): void,
  children: string,
};

type State = {};
