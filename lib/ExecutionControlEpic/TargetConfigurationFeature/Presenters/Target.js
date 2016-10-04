'use babel'
// @flow

import React from 'react';
import PinButton from "./PinButton";

export default class Target extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{display: 'inline-block', padding: '5px', borderBottom: '2px solid #fff', borderLeft: '0px solid #000', borderTop: '0px solid #000', borderRight: '0px solid #000'}}>
        <img src={this.props.iconUri} style={{height: '30px', width: '30px'}}/>
        <span style={{marginLeft: '5px', marginRight: '5px'}}>{this.props.name}</span>
        {
          this.props.pinnable ?
          (<PinButton onClick={this.props.onPin}/>) :
          false
        }
      </div>
    )
  }
}

Target.propTypes = {

};

Target.defaultProps = {
  pinnable: false
};

type DefaultProps = {

};

type Props = {
  pinnable: boolean,
  onPin(): void,
  iconUri: string,
  name: string,
};

type State = {

};
