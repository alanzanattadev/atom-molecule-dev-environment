'use babel'
// @flow

import React from 'react';

export default class TargetConfigNumberInputField extends React.Component<DefaultProps, Props, State> {

  props: Props;
  state: State;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <input type="number" className="input-number native-key-bindings" style={{maxWidth: '100px', margin: '5px'}} value={this.props.value} onChange={e => this.props.onChange(e.target.value)}/>
    )
  }
}

TargetConfigNumberInputField.propTypes = {

};

TargetConfigNumberInputField.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  value: number,
  onChange(value: number): void
};

type State = {

};
