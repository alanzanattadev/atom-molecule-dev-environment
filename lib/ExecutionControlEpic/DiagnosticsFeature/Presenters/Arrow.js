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
    return <div onClick={this.props.onClick} />;
  }
}

Arrow.propTypes = {};

Arrow.defaultProps = {};

type DefaultProps = {};

type Props = {
  onClick?: () => void,
};

type State = {};
