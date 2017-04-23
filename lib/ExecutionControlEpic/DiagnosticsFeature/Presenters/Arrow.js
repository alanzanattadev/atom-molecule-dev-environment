"use babel";
// @flow

import React from "react";

export default class Arrow extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="color-text-white" onClick={this.props.onClick}>
        {this.props.side === "right" ? ">" : "<"}
      </div>
    );
  }
}

Arrow.defaultProps = {};

type DefaultProps = {};

type Props = {
  onClick?: () => void,
};

type State = {};
