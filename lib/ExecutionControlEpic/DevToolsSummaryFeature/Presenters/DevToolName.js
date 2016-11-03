'use babel'
// @flow

import React from 'react';

export default class DevToolName extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{padding: '3px 5px', border: '0.5px #fdfffc solid', display: 'inline-flex', borderRadius: '4px', alignItems: 'center', cursor: this.props.onClick && 'pointer'}}
        onClick={this.props.onClick}
      >
        <span style={{fontFamily: 'Inconsolata', fontSize: '10px', color: '#fdfffc'}}>{this.props.children}</span>
        <img src="settings-icon.svg" style={{marginLeft: '10px', height: '15px', width: '15px'}}/>
      </div>
    )
  }
}

DevToolName.propTypes = {

};

DevToolName.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  onClick(): void,
  children: string
};

type State = {

};
