"use babel";
// @flow

import React from "react";
import StashPanel from "./StashPanel";

export default class StashPanelContainer
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;
  interval: any;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.props.onStashList(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <StashPanel {...this.props} />;
  }
}

StashPanelContainer.propTypes = {};

StashPanelContainer.defaultProps = {};

type DefaultProps = {};

type Props = {
  onStashList(): void,
};

type State = {};
