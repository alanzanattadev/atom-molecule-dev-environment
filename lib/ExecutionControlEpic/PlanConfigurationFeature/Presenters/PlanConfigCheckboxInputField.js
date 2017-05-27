"use babel";
// @flow

import React from "react";
import { StateProxy } from "react-forms-state";

class PlanConfigCheckboxInputField
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <span>
        <label className={"input-label"}>
          <input
            className={"input-checkbox"}
            type="checkbox"
            checked={this.props.value}
            onChange={e => this.props.onChange(e.target.checked)}
          />
          {this.props.title}
        </label>
      </span>
    );
  }
}

export default StateProxy()(PlanConfigCheckboxInputField);

PlanConfigCheckboxInputField.defaultProps = {};

type DefaultProps = {};

type Props = {
  value: boolean,
  title?: string,
  onChange(value: boolean): void,
};

type State = {};
