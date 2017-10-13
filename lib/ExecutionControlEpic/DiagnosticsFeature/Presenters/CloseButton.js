"use babel";
// @flow

import * as React from "react";

export default class CloseButton extends React.Component<Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <button
        onClick={this.props.onClick}
        className="icon icon-x"
        style={{ border: "0px", backgroundColor: "rgba(0, 0, 0, 0)" }}
      />
    );
  }
}

CloseButton.defaultProps = {};

type DefaultProps = {};

type Props = {
  onClick(): void,
};

type State = {};
