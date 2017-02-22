"use babel";
// @flow

import React from "react";
import Stash from "./Stash";
import type { Stash as StashType } from "../Types/types.js.flow";

export default class StashList
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ul style={{ padding: "0px" }}>
        {this.props.stashes.map(stash => (
          <li
            style={{ listStyle: "none" }}
            key={`${stash.name}${stash.commitId}${stash.branchName}`}
          >
            <Stash {...stash} />
          </li>
        ))}
      </ul>
    );
  }
}

StashList.propTypes = {};

StashList.defaultProps = {};

type DefaultProps = {};

type Props = {
  stashes: Array<StashType>
};

type State = {};
