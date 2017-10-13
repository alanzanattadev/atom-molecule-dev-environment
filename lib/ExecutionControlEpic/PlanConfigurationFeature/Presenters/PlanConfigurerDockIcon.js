"use babel";
// @flow

import * as React from "react";
import DockIcon from "../../../GlobalSystem/Presenters/DockIcon";

export default class PlanConfigurerDockIcon extends React.Component<
  Props,
  State,
> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <DockIcon
        iconUri="atom://molecule-dev-environment/.storybook/public/plan-configuration-icon.svg"
        name="plan configuration"
        color="#35232A"
        {...this.props}
      />
    );
  }
}

PlanConfigurerDockIcon.defaultProps = {};

type DefaultProps = {};

type Props = {};

type State = {};
