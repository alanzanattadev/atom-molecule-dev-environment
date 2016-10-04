'use babel'
// @flow

'use babel'
// @flow

import React from 'react';

export default class DevTool extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div onClick={this.props.onClick}>
        <img src={this.props.iconUri} style={{height: '25px', width: '25px'}}/>
      </div>
    )
  }
}

DevTool.propTypes = {

};

DevTool.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  iconUri: string,
  onClick(): void,
};

type State = {

};
