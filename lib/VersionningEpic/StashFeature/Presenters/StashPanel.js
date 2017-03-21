"use babel";
// @flow

import React from "react";
import StashList from "./StashList";
import StashButton from "./StashButton";
import StashPopButton from "./StashPopButton";
import type {Stash as StashType} from "../Types/types.js.flow";

export default class StashPanel
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{ maxWidth: "350px" }}>
        <span
          className="text-color-highlight"
          style={{
            fontSize: "25px",
            marginLeft: "10px",
          }}
        >
          Stash
        </span>
        <div>
          <StashList stashes={this.props.stashes} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <StashButton onClick={this.props.onStash} />
          <StashPopButton onClick={this.props.onStashPop} />
        </div>
      </div>
    );
  }
}

StashPanel.propTypes = {};

StashPanel.defaultProps = {
  onStash() {
  },
  onStashPop() {
  },
};

type DefaultProps = {};

type Props = {
  stashes: Array<StashType>,
  onStash(): void,
  onStashPop(): void,
};

type State = {};
