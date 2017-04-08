"use babel";
// @flow

import React from "react";
import DockIcon from "../../../GlobalSystem/Presenters/DockIcon";

export default class VersionningDockIcon
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <DockIcon
        iconUri="atom://molecule-dev-environment/.storybook/public/versionning-icon.svg"
        name="versionning"
        color="#233235"
        {...this.props}
      />
    );
  }
}

VersionningDockIcon.defaultProps = {};

type DefaultProps = {};

type Props = {};

type State = {};
