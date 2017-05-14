"use babel";
// @flow

import React from "react";
import StashPanel from "./StashPanel";
import type { Stash as StashType } from "../Types/types.js.flow";

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

StashPanelContainer.defaultProps = {};

type DefaultProps = {};

type Props = {
  stashes: Array<StashType>,
  onStashList(): void,
  onStash(): void,
  onStashPop(): void,
};

type State = {};
