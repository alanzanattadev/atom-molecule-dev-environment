"use babel";
// @flow

import * as React from "react";

export default class PinButton extends React.Component<Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <button
        className="btn icon icon-pin"
        onClick={e => {
          this.props.onClick();
          e.stopPropagation();
        }}
      />
    );
  }
}

PinButton.defaultProps = {};

type DefaultProps = {};

type Props = {
  onClick(): void,
};

type State = {};
