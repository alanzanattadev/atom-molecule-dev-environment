'use babel'
// @flow

import React from 'react';
import PackageConfig from '../../../ExecutionControlEpic/TargetConfigurationFeature/Presenters/PackageConfig';
import { connect } from "react-redux";
import type {PackageInfos} from '../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow';
import {selectPackagesOfTool} from '../../../ProjectSystemEpic/PackageFeature/Selectors/Packages';
import {selectPackagesReducer} from '../../../GlobalSystem/Selectors';

export class PackageConfigContainer extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <PackageConfig value={this.props.value} onChange={value => this.props.onChange(this.props.packages.find(p => p.path == value))} packages={this.props.packages}/>
    )
  }
}

PackageConfigContainer.propTypes = {

};

PackageConfigContainer.defaultProps = {
  packages: []
};

type DefaultProps = {

};

type Props = {
  packages: Array<PackageInfos>
};

type State = {
  value: string,
};

export function mapStateToProps(state: State): {} {
  return {
    packages: selectPackagesOfTool(selectPackagesReducer(state), "git"),
  };
};

export function mapDispatchToProps(dispatch: (action: any) => any): {} {
  return {

  };
};

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(PackageConfigContainer);
