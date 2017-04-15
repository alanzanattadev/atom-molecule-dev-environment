"use babel";
// @flow

import React from "react";

export default class DiagnosticsSearchField
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <input
        className="input-text native-key-bindings"
        type="text"
        onChange={e => this.props.onChange(e.target.value)}
        value={this.props.value}
      />
    );
  }
}

DiagnosticsSearchField.defaultProps = {};

type DefaultProps = {};

type Props = {
  value: string,
  onChange(value: string): void,
};

type State = {};
