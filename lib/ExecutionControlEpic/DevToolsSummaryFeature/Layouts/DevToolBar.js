"use babel";
// @flow

import * as React from "react";
import PinnedPlans from "../Containers/PinnedPlans";

export default class DevToolBar extends React.Component<Props, State> {
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
          height: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          overflowY: "visible",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "absolute",
            overflowY: "visible",
            zIndex: 10,
            bottom: "8px",
            right: "24px",
          }}
        >
          <PinnedPlans {...this.props} />
        </div>
      </div>
    );
  }
}

DevToolBar.defaultProps = {};

type DefaultProps = {};

type Props = {};

type State = {};
