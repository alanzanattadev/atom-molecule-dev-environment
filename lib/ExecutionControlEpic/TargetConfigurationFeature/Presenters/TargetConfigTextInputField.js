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
      <div style={{display: 'flex', minHeight: '40px', margin: '5px 5px 5px 0px'}}>
        <span className="tool-name-background-color text-color-highlight"style={{padding: '10px', minWidth: '80px', color: 'src', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px'}}>
          {this.props.label}
        </span>
        <input type="text" className="text-color-highlight input-text native-key-bindings" style={{
          maxWidth: '400px',
          margin: '0px',
          borderTopLeftRadius: '0px',
          borderBottomLeftRadius: '0px',
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px',
          borderWidth: '0px',
          padding: '5px 20px'}} value={this.props.value} onChange={e => this.props.onChange(e.target.value)}/>
      </div>
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
  label: string,
};

type State = {

};
