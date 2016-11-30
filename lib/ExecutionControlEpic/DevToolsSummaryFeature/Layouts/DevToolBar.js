'use babel'
// @flow

import React from 'react';
import DevTools from "../Containers/DevTools";
import DevToolsWithDiagnostics from "../Containers/DevToolsWithDiagnostics";

export default class DevToolBar extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'stretch', height: '55px', backgroundColor: '#0f1319', overflowY: 'visible', flexDirection: 'column'}}>
        <div style={{position: 'relative', top: '-25px', overflowY: 'visible'}}>
          <DevToolsWithDiagnostics {...this.props}/>
        </div>
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
