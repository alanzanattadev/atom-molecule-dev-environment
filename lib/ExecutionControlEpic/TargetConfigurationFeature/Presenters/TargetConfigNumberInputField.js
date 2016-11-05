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
      <div style={{display: 'flex', margin: '5px', height: '40px', flex: '1'}}>
        <span style={{display: 'flex', alignItems: 'center', borderRadius: '10px 0px 0px 10px', padding: '5px 10px', backgroundColor: '#263144', color: '#fdfffc', fontSize: '12px', minWidth: '80px'}}>
          {this.props.title}
        </span>
        <input type="number" className="input-number native-key-bindings" style={{padding: '5px 10px', color: '#fdfffc', flex: '1', borderRadius: '0px 10px 10px 0px'}} value={this.props.value} onChange={e => this.props.onChange(e.target.value)}/>
      </div>
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
  title: string,
  onChange(value: number): void
};

type State = {

};
