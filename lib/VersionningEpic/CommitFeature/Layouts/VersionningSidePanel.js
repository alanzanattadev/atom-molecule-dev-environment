'use babel'
// @flow

import React from 'react';
import StashPanel from "../../StashFeature/Containers/StashPanel";
import CommitPanel from "../Containers/CommitPanel";
import PackageConfig from '../Containers/PackageConfig';
import type {PackageInfos} from '../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow';
import {refreshPackages} from '../Actions/RefreshPackages';
import {connect} from 'react-redux';

export class VersionningSidePanel extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      currentPackage: undefined,
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshPackages(atom.project.getPaths()[0]));
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div style={{display: 'flex', alignItems: 'stretch', width: '350px', flexDirection: 'column'}}>
        <PackageConfig value={this.state.currentPackage ? this.state.currentPackage.path : null} onChange={value => this.setState({currentPackage: value})}/>
        <CommitPanel currentPackage={this.state.currentPackage}/>
        <StashPanel currentPackage={this.state.currentPackage}/>
      </div>
    )
  }
}

VersionningSidePanel.propTypes = {

};

VersionningSidePanel.defaultProps = {

};

type DefaultProps = {

};

type Props = {

};

type State = {
  currentPackage: PackageInfos,
};

export default connect()(VersionningSidePanel);
