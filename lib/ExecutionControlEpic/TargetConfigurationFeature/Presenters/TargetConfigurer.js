'use babel'
// @flow

import React from 'react';
import TargetConfigPart from "./TargetConfigPart";
import AddButton from "./AddButton";
import type {ConfigSchemaPart} from "../Types/types.js.flow";
import {getDefault} from "../Model/TargetConfigManipulators";
import StagerConfig from "./StagerConfig";
import TargetConfigTextInputField from "./TargetConfigTextInputField";
import PackageConfig from './PackageConfig';
import { fromJS } from "immutable";

export default class TargetConfigurer extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      config: getDefault(this.props.config),
      name: '',
      stager: {
        expressionValue: 'integrated',
        caseValue: null,
      },
      packageInfos: this.props.packages[0] ? this.props.packages[0].path : undefined,
    };
  }

  render() {
    return (
      <div style={{maxWidth: '500px', padding: '10px 20px', display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1'}}>
        <TargetConfigTextInputField label="name" value={this.state.name} onChange={value => this.setState(fromJS(this.state).set('name', value).toJS())}/>
        <h1 style={{fontSize: '16px', color: '#fdfffc'}}>Config</h1>
        <TargetConfigPart value={this.state.config} onChange={value => this.setState(fromJS(this.state).set('config', value).toJS())} {...this.props.config}/>
        <PackageConfig value={this.state.packageInfos} onChange={value => this.setState(fromJS(this.state).set('packageInfos', value).toJS())} packages={this.props.packages}/>
        <StagerConfig value={this.state.stager} onChange={value => this.setState(fromJS(this.state).set('stager', value).toJS())}/>
        <span style={{alignSelf: 'flex-end'}}>
          <AddButton onClick={() => this.props.onAddTarget({config: this.state.config, name: this.state.name, stager: {
            type: this.state.stager.expressionValue,
            host: this.state.stager.expressionValue == "remote" ? Object.assign({}, this.state.stager.caseValue.host, {transport: Object.assign({}, {
              type: this.state.stager.caseValue.method.expressionValue,
            }, this.state.stager.caseValue.method.caseValue)}) : null,
            packageInfos: this.props.packages.find(p => p.path == this.state.packageInfos)
          }})} success>
            Create
          </AddButton>
        </span>
      </div>
    )
  }
}

TargetConfigurer.propTypes = {

};

TargetConfigurer.defaultProps = {
  packages: [],
};

type DefaultProps = {

};

type Props = {
  config: ConfigSchemaPart,
  onAddTarget(target: {config: mixed, name: string}): void,
};

type State = {
  name: string,
  config: mixed,
  stager: {
    expressionValue: mixed,
    caseValue: mixed,
  },
  packageInfos: string
};
