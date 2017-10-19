"use babel";
// @flow

import * as React from "react";
import PinnedPlans from "../Containers/PinnedPlans";

export default class PinnedPlanPanel extends React.Component<Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{}}>
        <PinnedPlans {...this.props} />
      </div>
    );
  }
}

PinnedPlanPanel.defaultProps = {};

type DefaultProps = {};

type Props = {};

type State = {};
