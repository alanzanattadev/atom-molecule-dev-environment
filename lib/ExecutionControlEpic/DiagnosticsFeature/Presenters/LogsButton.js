"use babel";
// @flow

import React from "react";
import Image from "react-image-fallback";

export default class LogsButton
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Image
        fallbackImage="diagnostic-icon-log.svg"
        src="atom://molecule-dev-environment/.storybook/public/diagnostic-icon-log.svg"
        style={{ transition: "all 0.2s", height: "20px", width: "20px" }}
        onClick={this.props.onClick}
      />
    );
  }
}

LogsButton.defaultProps = {};

type DefaultProps = {};

type Props = {
  onClick(): void,
};

type State = {};
