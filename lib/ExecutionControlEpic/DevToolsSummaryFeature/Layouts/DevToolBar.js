'use babel'
// @flow

import React from 'react';
import DevTools from "../Containers/DevTools";

export default class DevToolBar extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40px'}}>
        <DevTools {...this.props}/>
      </div>
    )
  }
}

DevToolBar.propTypes = {

};

DevToolBar.defaultProps = {

};

type DefaultProps = {

};

type Props = {

};

type State = {

};
