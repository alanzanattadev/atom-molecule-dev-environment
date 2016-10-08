'use babel'
// @flow

import React from 'react';
import TargetConfigurer from "../Containers/TargetConfigurer";
import DevToolTargets from "../Containers/DevToolTargets";

export default class TargetConfigPanel extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div key={this.props.toolId} style={{height: '170px', overflow: 'auto'}}>
        <DevToolTargets {...this.props} pinnable/>
        <TargetConfigurer {...this.props}/>
      </div>
    )
  }
}

TargetConfigPanel.propTypes = {

};

TargetConfigPanel.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  toolId: string
};

type State = {

};
