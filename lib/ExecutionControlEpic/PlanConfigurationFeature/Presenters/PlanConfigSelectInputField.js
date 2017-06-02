"use babel";
// @flow

import React from "react";

export default class PlanConfigSelectInputField
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <select
        value={this.props.value}
        className="tool-name-background-color text-color-highlight input-select"
        style={{
          display: "flex",
          overflow: "auto",
          borderRadius: "5px",
          padding: "5px",
          height: "40px",
          border: "0px",
          margin: "5px 5px 5px 0px",
        }}
        onChange={e => this.props.onChange(e.target.value)}
      >
        {this.props.options.map(option => (
          <option key={option.description} value={option.value}>
            {option.description}
          </option>
        ))}
      </select>
    );
  }
}

PlanConfigSelectInputField.defaultProps = {};

type Props = {
  title?: string,
  options: Array<{ value: string, description: string }>,
  value: string,
  onChange(value: string): void,
};

type DefaultProps = {};

type State = {};
