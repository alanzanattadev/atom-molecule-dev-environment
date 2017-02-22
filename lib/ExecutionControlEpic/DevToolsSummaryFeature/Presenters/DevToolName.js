"use babel";
// @flow

import React from "react";
import Image from "react-image-fallback";

export default class DevToolName
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
          padding: "3px 5px",
          display: "inline-flex",
          borderRadius: "4px",
          alignItems: "center",
          cursor: this.props.onClick && "pointer"
        }}
        onClick={this.props.onClick}
      >
        <span
          className="text-color-highlight"
          style={{ fontFamily: "Inconsolata", fontSize: "14px" }}
        >
          {this.props.children}
        </span>
        <Image
          fallbackImage="settings-icon.svg"
          src="atom://molecule-dev-environment/.storybook/public/settings-icon.svg"
          style={{ marginLeft: "10px", height: "15px", width: "15px" }}
        />
      </div>
    );
  }
}

DevToolName.propTypes = {};

DevToolName.defaultProps = {};

type DefaultProps = {};

type Props = {
  onClick(): void,
  children: string
};

type State = {};
