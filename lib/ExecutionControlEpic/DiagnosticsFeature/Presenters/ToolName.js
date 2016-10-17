'use babel'
// @flow

import React from 'react';

export default class ToolName extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{padding: '5px 10px', borderRadius: '0px 0px 4px 4px', backgroundColor: '#2ec4b6', display: 'inline-flex'}}>
        <span style={{color: '#fdfffc', fontFamily: 'Inconsolata', fontSize: '10px'}}>{this.props.children}</span>
      </div>
    )
  }
}

ToolName.propTypes = {

};

ToolName.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  children: string
};

type State = {

};
