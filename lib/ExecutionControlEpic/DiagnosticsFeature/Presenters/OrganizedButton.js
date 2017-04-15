"use babel";
// @flow

import React from "react";

export default class OrganizedButton
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return <div />;
  }
}

OrganizedButton.defaultProps = {};

type DefaultProps = {};

type Props = {};

type State = {};
