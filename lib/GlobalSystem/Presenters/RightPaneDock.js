'use babel'
// @flow

import React from 'react';
import PaneDock from "./PaneDock";
import VersionningDockIcon from "../../VersionningEpic/CommitFeature/Presenters/VersionningDockIcon";
import TargetConfigurerDockIcon from '../../ExecutionControlEpic/TargetConfigurationFeature/Presenters/TargetConfigurerDockIcon';

export default class RightPaneDock extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <PaneDock>
        <VersionningDockIcon onClick={() => this.props.onVersionning()}/>
        <TargetConfigurerDockIcon onClick={() => this.props.onTargetConfigurer()}/>
      </PaneDock>
    )
  }
}

RightPaneDock.propTypes = {

};

RightPaneDock.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  onVersionning(): void,
  onTargetConfigurer(): void,
};

type State = {

};
