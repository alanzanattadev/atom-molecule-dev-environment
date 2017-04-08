"use babel";
// @flow

import React from "react";
import RightPaneDock from "../Presenters/RightPaneDock";

export default class SideDock
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
          display: "flex",
          flex: 1,
          alignItems: "center",
          height: "100%",
        }}
      >
        <RightPaneDock {...this.props} />
      </div>
    );
  }
}

SideDock.defaultProps = {};

type DefaultProps = {};

type Props = {};

type State = {};
