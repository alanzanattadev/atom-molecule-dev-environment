'use babel'
// @flow

import React from 'react';

export default class TargetConfigTextInputField extends React.Component<DefaultProps, Props, State> {

  props: Props;
  state: State;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <input type="text" className="input-text native-key-bindings" style={{maxWidth: '400px', margin: '5px'}} value={this.props.value} onChange={e => this.props.onChange(e.target.value)}/>
    );
  }
}

TargetConfigTextInputField.propTypes = {

};

TargetConfigTextInputField.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  value: string,
  onChange(value: string): void,
};

type State = {

};
