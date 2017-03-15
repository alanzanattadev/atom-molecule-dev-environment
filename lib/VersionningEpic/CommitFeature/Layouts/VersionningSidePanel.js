"use babel";
// @flow

import React from "react";
import StashPanel from "../../StashFeature/Containers/StashPanel";
import CommitPanel from "../Containers/CommitPanel";
import PackageConfig from "../Containers/PackageConfig";
import CloseButton from '../../../ExecutionControlEpic/DiagnosticsFeature/Presenters/CloseButton';
import type {
  PackageInfos
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import { refreshPackages } from "../Actions/RefreshPackages";
import { connect } from "react-redux";
import BranchPanel from "../../BranchFeature/Containers/BranchPanel";

export class VersionningSidePanel
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      currentPackage: undefined
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
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          width: "350px",
          flexDirection: "column"
        }}
      >
      <h1
        className="text-color-highlight"
        style={{
          fontSize: '25px',
          marginLeft: '5px',
        }}>
          Versionning
        </h1>
        <PackageConfig
          value={
            this.state.currentPackage ? this.state.currentPackage.path : null
          }
          onChange={value => this.setState({ currentPackage: value })}
        />
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <CloseButton onClick={this.props.onClose} />
        </div>
        {(this.state.currentPackage === undefined) ? null :
          <div style={{   display: "flex", alignItems: "stretch", flexDirection: "column" }}>
            <CommitPanel currentPackage={this.state.currentPackage} />
            <StashPanel currentPackage={this.state.currentPackage} />
            <BranchPanel currentPackage={this.state.currentPackage} />
          </div>}
        <div style={{ flex: "1" }} />
      </div>
    );
  }
}

VersionningSidePanel.propTypes = {};

VersionningSidePanel.defaultProps = {};

type DefaultProps = {};

type Props = {
  onClose(): void,
};

type State = {
  currentPackage: PackageInfos
};

export default connect()(VersionningSidePanel);
