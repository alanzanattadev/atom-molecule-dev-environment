'use babel'
// @flow

import React from 'react';

export default class TargetConfigSelectInputField extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <select value={this.props.value} className="input-select" onChange={e => this.props.onChange(e.target.value)}>
        {this.props.options.map(option => (
          <option key={option.description} value={option.value}>{option.description}</option>
        ))}
      </select>
    )
  }
}

TargetConfigSelectInputField.propTypes = {

};

TargetConfigSelectInputField.defaultProps = {

};

type Props = {
  options: Array<{value: string, description: string}>,
  value: string,
  onChange(value: string): void,
};

type DefaultProps = {

};

type State = {

};
