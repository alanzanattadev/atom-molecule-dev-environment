"use babel";
// @flow

import React from "react";

export default class ToolName
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
        className="tool-name-background-color"
        style={{
          padding: "5px 10px",
          borderRadius: "0px 0px 4px 4px",
          display: "inline-flex",
        }}
      >
        <span className="text-color-highlight" style={{ fontSize: "16px" }}>
          {this.props.children}
        </span>
      </div>
    );
  }
}

ToolName.propTypes = {};

ToolName.defaultProps = {};

type DefaultProps = {};

type Props = {
  children: string,
};

type State = {};
